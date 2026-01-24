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
import { ChevronDown, ChevronUp, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteProduct } from "@/app/actions";
import { toast } from "sonner";

const ProductCard = ({ product, user }) => {
  console.log(product);

  const [showChart, setShowChart] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {};

  return (
    <Card className="relative mx-auto w-full max-w-md pt-0 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35 rounded-t-2xl" />
      <img
        src={product.image_url}
        alt={product.product_name}
        className="relative z-20 aspect-video w-full object-cover "
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">
            <TrendingDown size="md" />
            Tracking
          </Badge>
        </CardAction>
        <CardTitle>{product.product_name}</CardTitle>
        <CardDescription className={"text-3xl font-bold text-orange-500"}>
          {product.currency} {product.current_price}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex flex-wrap gap-2 items-start">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChart(!showChart)}
            className="gap-1"
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
            className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
