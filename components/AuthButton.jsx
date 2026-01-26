"use client";
import { useState } from "react";
import { AuthModal } from "./AuthModal";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { signOut } from "@/app/actions";

const AuthButton = ({ user }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (user) {
    return (
      <form action={signOut}>
        <Button
          className={
            "bg-gray-400 hover:bg-gray-600 gap-2 cursor-pointer text-white"
          }
          variant="ghost"
          onClick={() => setShowAuthModal(true)}
          size="sm"
          type="submit"
        >
          <LogIn size={16} />
          Sign Out
        </Button>
      </form>
    );
  }

  return (
    <>
      <Button
        className={"bg-orange-500 hover:bg-amber-700 gap-2 cursor-pointer"}
        variant="default"
        onClick={() => setShowAuthModal(true)}
        size="sm"
      >
        <LogIn size={16} />
        Sign In
      </Button>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default AuthButton;
