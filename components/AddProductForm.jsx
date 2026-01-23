"use client";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

const AddProductForm = ({ user }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = (e) => {};

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
    </>
  );
};

export default AddProductForm;
