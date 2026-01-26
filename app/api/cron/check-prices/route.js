import { scrapeProduct } from "@/lib/firecrawl";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { sendPriceDropAlert } from "../../../../lib/email";

export async function GET() {
  return NextResponse.json({
    message: "Cron job to check prices executed successfully",
  });
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY,
    );

    const { data: products, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
        { error: "Error fetching products" },
        { status: 500 },
      );
    }

    const result = {
      total: products.length,
      updated: 0,
      failed: 0,
      priceChanges: 0,
      alertsSent: 0,
    };

    for (const product of products) {
      try {
        const productData = await scrapeProduct(product.url);

        if (!productData || !productData.currentPrice) {
          result.failed += 1;
          continue;
        }
        const newPrice = parseFloat(productData.currentPrice);
        const oldPrice = parseFloat(product.current_price);
        console.log(
          `Product ID: ${product?.id},Product Name: ${product?.product_name}, Old Price: ${oldPrice}, New Price: ${newPrice}`,
        );
        await supabase
          .from("products")
          .update({
            current_price: newPrice || product.current_price,
            product_name: productData.productName || product.product_name,
            image_url: productData.productImageUrl || product.image_url,
            currency: productData.currency || product.currency,
          })
          .eq("id", product.id);

        if (newPrice !== oldPrice) {
          result.priceChanges += 1;
          const response = await supabase.from("price_history").insert({
            product_id: product.id,
            price: newPrice,
            currency: productData.currency || product.currency,
            checked_at: new Date().toISOString(),
          });
          console.log("Price history insert response:", response);
          result.updated += 1;
          if (newPrice < oldPrice) {
            const {
              data: { user },
            } = await supabase.auth.admin.getUserById(product.user_id);

            if (user && user.email) {
              const emailResult = await sendPriceDropAlert(
                user.email,
                product,
                oldPrice,
                newPrice,
              );
              if (emailResult.success) {
                result.alertsSent += 1;
              }
            }
          }
        }
      } catch (error) {
        result.failed += 1;
        console.error(`Error processing product ID ${product.id}:`, error);
      }
    }
    return NextResponse.json({
      success: true,
      message: "Price updated successfully",
      result,
    });
  } catch (error) {
    console.error("Error in cron job:", error);
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 });
  }
}
