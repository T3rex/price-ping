import { Rabbit, Shield, Bell, TrendingDown } from "lucide-react";
import AddProductForm from "../components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { getProducts } from "./actions";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const products = user ? (await getProducts()).products : [];

  console.log(products);

  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description:
        "Deal Drop extracts prices in seconds, handling JavaScript and dynamic content",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description:
        "Works across all major e-commerce sites with built-in anti-bot protection",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50">
      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b border-orange-200 px-4 py-2 flex justify-between items-center">
        <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              className="h-15 w-auto"
              src={"/price-ping-logo.png"}
              // width={300}
              // height={100}
            />
          </div>
          {/* AUTH BUTTON */}
          <AuthButton user={user} />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="py-20 px-4">
        <div className="flex flex-col items-center">
          <div className="w-fit inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-6 py-2 rounded-full text-md font-medium mb-6">
            Built by<span className="font-extrabold">T3rex</span>
          </div>

          <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Never Miss a Price Drop
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl text-center">
            Track prices from any e-commerce site. Get instant alerts when
            prices drop. Save money effortlessly.
          </p>
          {/* PRODUCT FORM */}
          <AddProductForm user={user} />
          {/* FEATURES */}
          {products.length === 0 && (
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-16">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 text-center">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {user && products.length > 0 && (
            <section>
              <div>
                <h3>Your Tracked Products</h3>
                <span>
                  {products.length}{" "}
                  {products.length === 1 ? "product" : "products"}
                </span>
              </div>
            </section>
          )}

          {user && products.length === 0 && (
            <div className="border-dashed border-2 mt-10 max-w-6xl w-full border-gray-300 p-10 rounded-lg flex flex-col items-center">
              <TrendingDown className="w-16 h-16 text-gray-300 mt-5 mx-auto" />
              <h3 className="text-3xl font-semibold">No products yet</h3>
              <p className="text-gray-500 mt-2 text-center">
                Add your first product to start tracking prices!
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
