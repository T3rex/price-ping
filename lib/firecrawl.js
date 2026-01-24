import Firecrawl from "@mendable/firecrawl-js";

const firecrawl = new Firecrawl({
  apiKey: "fc-f6e920e2434d4d458913caf4b33593c9",
});

export async function scrapeProduct(url) {
  try {
    const result = await firecrawl.scrape(url, {
      formats: [
        {
          type: "json",
          schema: {
            type: "object",
            required: ["productName", "currentPrice"],
            properties: {
              productName: { type: "string" },
              currentPrice: { type: "number" },
              productImageUrl: { type: "string" },
              currency: { type: "string" },
            },
          },
          prompt:
            'Extract the product name as "productName", current price as a number as "currentPrice", currency code (USD, INR etc.) as "currency" and product image URL as "productImageUrl" if available',
        },
      ],
    });

    if (!result) {
      throw new Error("Firecrawl scraping failed");
    }

    const extractedData = result?.json;
    console.log(extractedData);

    if (
      !extractedData ||
      !extractedData.productName ||
      !extractedData.currentPrice
    ) {
      throw new Error("Failed to extract product data");
    }

    return extractedData;
  } catch (error) {
    console.error("Error during scraping:", error);
    throw error;
  }
}
