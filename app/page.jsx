import {
  Zap,
  Shield,
  Bell,
  Search,
  MousePointerClick,
  LineChart,
  Globe,
} from "lucide-react";
import AddProductForm from "../components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import ProductCard from "@/components/ProductCard";
import { createClient } from "@/utils/supabase/server";
import { getProducts } from "./actions";
import FeatureCard from "@/components/FeatureCard";

const steps = [
  {
    id: 1,
    icon: <Search className="w-5 h-5 text-orange-600" />,
    title: "Find Product",
    desc: "Browse your favorite store (Amazon, Flipkart) and find the item you want to track.",
  },
  {
    id: 2,
    icon: <MousePointerClick className="w-5 h-5 text-orange-600" />,
    title: "Paste URL",
    desc: "Copy the product link and paste it into the search bar above. We'll fetch the details instantly.",
  },
  {
    id: 3,
    icon: <Bell className="w-5 h-5 text-orange-600" />,
    title: "Get Notified",
    desc: "Relax. We'll send you an email the moment the price drops below your target.",
  },
];

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const products = user ? (await getProducts()).products : [];

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-100">
      {/*  NAVIGATION */}
      <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="/price-ping-logo.png"
              alt="Logo"
              className="h-12 w-auto"
            />
          </div>
          <AuthButton user={user} />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Abstract Background Gradient - Warm Sunrise Feel */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-200 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100/60 via-orange-50/30 to-transparent -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-sm font-semibold mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Real-time tracking is live
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 leading-[1.1]">
            Stop Overpaying. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600">
              Start Pinging.
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The intelligent price tracker that monitors Amazon, Flipkart, and
            major retailers 24/7. We alert you the moment a deal drops.
          </p>

          {/* INPUT BOX*/}
          <div className="max-w-xl mx-auto bg-white p-2 rounded-2xl shadow-xl shadow-orange-100/50 border border-orange-100">
            <AddProductForm user={user} />
          </div>

          <p className="mt-4 text-sm text-slate-400">
            Support all platforms: Amazon, Flipkart, Myntra, & more
          </p>
        </div>
      </section>

      {/* USER DASHBOARD  */}
      {user && products.length > 0 && (
        <section className="py-12 px-6 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-800">
                Your Watchlist
              </h2>
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium border border-orange-200">
                {products.length} Active
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} user={user} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WORKING  */}
      {(!user || products.length === 0) && (
        <section className="py-24 bg-gradient-to-b from-white to-orange-50/30 border-y border-orange-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                Effortless Savings in 3 Steps
              </h2>
              <p className="text-slate-500 text-lg">
                No complex setups. Just copy, paste, and save.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Line  */}
              <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200 border-t-2 border-dashed border-orange-200/50 -z-0" />
              {/* STEPS */}
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="relative bg-white p-8 rounded-2xl border border-orange-100 shadow-sm z-10 transition-transform hover:-translate-y-1 cursor-pointer"
                >
                  <div
                    className={`w-14 h-14 border-2 border-orange-500 rounded-xl flex items-center justify-center text-orange-600 font-bold text-xl mb-6  ${step.id === 1 ? "bg-orange-500 text-white border-none shadow-md shadow-orange-200" : "bg-white "} `}
                  >
                    {step.id}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    {step.icon}
                    <h3 className="text-xl font-bold text-slate-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURES  */}
      {(!user || products.length === 0) && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                  Power-Packed Performance
                </h2>
                <p className="text-slate-500 text-lg">
                  Built with advanced AI scraping technology to ensure you never
                  miss a deal.
                </p>
              </div>
              <div className="hidden md:flex gap-2">
                <div className="h-2 w-2 rounded-full bg-slate-200"></div>
                <div className="h-2 w-2 rounded-full bg-slate-200"></div>
                <div className="h-2 w-12 rounded-full bg-orange-500"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={LineChart}
                title="Price History"
                desc="Visualize price trends over time to predict the best time to buy."
              />
              <FeatureCard
                icon={Zap}
                title="Instant Alerts"
                desc="Our cron jobs run frequently to catch flash sales before they expire."
              />
              <FeatureCard
                icon={Shield}
                title="Anti-Bot Bypass"
                desc="We use enterprise-grade proxies to handle dynamic content & CAPTCHAs."
              />
              <FeatureCard
                icon={Globe}
                title="Multi-Store"
                desc="One dashboard for all your shopping lists across different platforms."
              />
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-orange-900/20">
              P
            </div>
            <span className="font-semibold text-lg text-white">Price Ping</span>
          </div>
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} Price Ping. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
