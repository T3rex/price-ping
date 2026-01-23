import { Button } from "@/components/ui/button";
import { LogIn, Rabbit, Shield, Bell } from "lucide-react";
import AddProductForm from "../components/AddProductForm";

export default function Home() {
  const user = null;
  const products = [];

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
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              className="h-30 w-auto"
              src={"/price-ping-logo.png"}
              width={600}
              height={200}
            />
          </div>
          <Button
            variant="default"
            size="sm"
            className={"bg-orange-500 hover: bg-amber-600 gap-2"}
          >
            <LogIn size={16} />
            Sign In
          </Button>
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
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
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
        </div>
      </section>
    </main>
  );
}
