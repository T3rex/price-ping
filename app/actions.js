"use server";

import { scrapeProduct } from "@/lib/firecrawl";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  revalidatePath("/");
  redirect("/");
}

export async function addProduct(formData) {
  const url = formData.get("url");
  if (!url) {
    return { error: "Product URL is required" };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "User not authenticated" };
    }

    const productData = await scrapeProduct(url);

    if (!productData.productName || !productData.currentPrice) {
      return { error: "Failed to scrape product data" };
    }

    const newPrice = parseFloat(productData.currentPrice);
    const currency = productData.currency || "INR";
    const productName = productData.productName;
    const productImageUrl = productData.productImageUrl || null;

    const { data: existingProduct } = await supabase
      .from("products")
      .select("id,current_price")
      .eq("user_id", user.id)
      .eq("url", url)
      .single();

    const isUpdate = !!existingProduct;

    const { data: product, error } = await supabase
      .from("products")
      .upsert(
        {
          user_id: user.id,
          url,
          product_name: productName,
          current_price: newPrice,
          currency,
          image_url: productImageUrl,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,url",
          ignoreDuplicates: false,
        },
      )
      .select()
      .single();

    if (error) {
      return { error: "Database error: " + error.message };
    }
    const shouldAddHistory =
      !isUpdate || existingProduct.current_price !== newPrice;

    if (shouldAddHistory) {
      const { error: historyError } = await supabase
        .from("price_history")
        .insert({
          product_id: product.id,
          price: newPrice,
          currency: currency,
          checked_at: new Date().toISOString(),
        });
    }
    revalidatePath("/");
    return {
      success: true,
      product,
      message: isUpdate
        ? "Product updated successfully"
        : "Product added successfully",
    };
  } catch (error) {
    console.error("Error adding product:", error);
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function deleteProduct(productId) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "User not authenticated" };
    }
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId)
      .eq("user_id", user.id);

    if (error) {
      return { error: "Database error: " + error.message };
    }
    revalidatePath("/");
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function getProducts() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "User not authenticated" };
    }

    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    console.log("Fetched products:", products);
    if (error) {
      return { error: "Database error: " + error.message };
    }

    return { success: true, products: products || [] };
  } catch (error) {
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function getPriceHistory(productId) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "User not authenticated" };
    }
    const { data: history, error } = await supabase
      .from("price_history")
      .getAll()
      .eq("product_id", productId)
      .order("checked_at", { ascending: true });

    if (error) {
      return { error: "Database error: " + error.message };
    }

    return { success: true, history: history || [] };
  } catch (error) {
    return { error: error.message || "An unexpected error occurred" };
  }
}
