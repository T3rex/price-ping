"use client";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { AuthModal } from "./AuthModal";
import { addProduct } from "@/app/actions";
import { toast } from "sonner";

const AddProductForm = ({ user }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("url", url);
    const result = await addProduct(formData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product added successfully!");
      setUrl("");
    }
    setLoading(false);
  };

  return (
    <>
      <form className="w-full max-w-2xl mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center sm:flex-row gap-2">
          <Input
            className="h-12 text-lg  focus:border-orange-500 focus:ring-orange-500"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste product URL here"
            disabled={loading}
            required
          />
          <Button
            className="h-10 sm:h-12 bg-orange-500 hover:bg-amber-600 gap-2 cursor-pointer"
            size="lg"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Track Product"
            )}
          </Button>
        </div>
      </form>

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default AddProductForm;
