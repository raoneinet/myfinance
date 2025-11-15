"use client";
import WelcomePage from "../welcome/page";
import { SignedIn } from "@/components/signwindows/signedin";
import { SignedOut } from "@/components/signwindows/signedout";
import { LoadingSpinner } from "@/components/loading/loadingSpinner";
import { useAuthContext } from "@/app/context/authContext";

const PageContent = () => {
  const { loading } = useAuthContext();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-full h-full md:h-screen">
      <SignedIn>
        <WelcomePage />
      </SignedIn>
      <SignedOut>
        <div className="container mx-auto">
          <div></div>
        </div>
      </SignedOut>
    </div>
  );
};

export default PageContent;
