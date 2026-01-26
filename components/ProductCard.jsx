"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingDown } from "lucide-react";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Trash2,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { deleteProduct } from "@/app/actions";
import { toast } from "sonner";
import PriceChart from "./PriceChart";

const ProductCard = ({ product, user }) => {
  const [showChart, setShowChart] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    const result = await deleteProduct(product.id);

    if (result.error) {
      toast.error("Error deleting product: " + result.error);
    } else {
      toast.success("Product deleted successfully");
    }
    setDeleting(false);
  };

  return (
    <Card className="relative mx-auto w-full max-w-md pt-0 rounded-2xl overflow-hidden h-fit">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35 rounded-t-2xl" />
      <img
        src={product.image_url}
        alt={product.product_name}
        className="relative z-20 aspect-video w-full object-cover "
      />
      <div className="absolute right-3 top-3 z-50">
        <Badge
          variant="secondary"
          className="bg-white/90 text-emerald-600 backdrop-blur-sm shadow-sm hover:bg-white border border-slate-100"
        >
          <TrendingDown className="mr-1 h-3 w-3" />
          Active
        </Badge>
      </div>
      <CardHeader>
        <CardTitle>
          <div className="mb-4">
            <Link
              href={product.url}
              target="_blank"
              className="hover:underline"
            >
              <h3 className="line-clamp-2 min-h-12 text-lg font-bold leading-tight text-slate-900 group-hover:text-indigo-700 transition-colors">
                {product.product_name}
              </h3>
            </Link>
          </div>
        </CardTitle>
        <CardDescription className={"text-3xl font-bold text-orange-500"}>
          {product.currency} {product.current_price.toLocaleString()}
          <span className=" mx-2 text-xs font-medium text-slate-400 uppercase tracking-wide">
            Current Price
          </span>
        </CardDescription>
      </CardHeader>
      <CardDescription>
        {/* <div className="flex flex-wrap gap-2 items-start ml-5 ">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChart(!showChart)}
            className="gap-1 cursor-pointer"
          >
            {showChart ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide Chart
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show Chart
              </>
            )}
          </Button>

          <Button variant="outline" size="sm" asChild className="gap-1">
            <Link href={product.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              View Product
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-1 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            {deleting ? "Removing..." : "Remove"}
          </Button>
        </div> */}
        <div className="mx-2 flex items-center gap-1 border-t border-slate-100 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChart(!showChart)}
            className={`flex-1 cursor-pointer border-slate-200 text-slate-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 ${showChart ? "bg-orange-50 text-orange-700 border-orange-200" : ""}`}
          >
            <BarChart3 className="h-4 w-4" />
            {showChart ? "Hide History" : "Price History"}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            asChild
            className="h-9 w-9 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
            title="View on Store"
          >
            <Link href={product.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={deleting}
            className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
            title="Stop Tracking"
          >
            {deleting ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardDescription>
      {showChart && (
        <CardFooter>
          <PriceChart productId={product.id} />
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductCard;
