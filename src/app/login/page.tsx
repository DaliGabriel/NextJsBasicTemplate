"use client";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import CredentialsForm from "../ui/Login/CredentialsForm";
import NavBar from "../ui/NavBar/NavBar";
import SuccessAlert from "../ui/Login/SuccessAlert";
import GoogleLoginButton from "../ui/Login/GoogleLoginButton";
import BackgroundShape from "../ui/Components/BackgroundShape";

function Page() {
  const [showsucces, setShowsucces] = useState(false);

  useEffect(() => {
    let params;
    let signUpUrlParameter;

    if (typeof window !== "undefined") {
      params = new URLSearchParams(window.location.search);
    }

    if (params) {
      signUpUrlParameter = params.get("signUp");
    }

    if (signUpUrlParameter) {
      setShowsucces(true);
    }
  }, []);

  return (
    <>
      <NavBar showLogin={false} />

      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-transparent to-transparent pb-12 pt-20 sm:pb-16 sm:pt-32 lg:pb-24 xl:pb-32 xl:pt-40">
        <BackgroundShape />

        <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 ">
          <div className="mx-auto max-w-2xl text-center">
            <div className="shadow-inner py-5">
              
              {showsucces && <SuccessAlert />}

              <h1 className="my-10 text-3xl font-bold text-gray-700">
                Upload your image! To get the prompt
              </h1>

              <GoogleLoginButton />

              {/* <CredentialsForm /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;
