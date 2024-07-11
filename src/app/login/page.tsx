"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import NavBar from "../ui/NavBar/NavBar";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showsucces, setShowsucces] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.ok) {
      router.push("/dashboard");
    } else {
      setError(result?.error || "Error on login form");
    }
  };

  useEffect(() => {
    let params;
    let signUpUrlParameter;

    if (typeof window !== "undefined") {
      params = new URLSearchParams(window.location.search);
    }

    if (params) {
      signUpUrlParameter = params.get("signUp"); // is the string "1234"
    }

    if (signUpUrlParameter) {
      setShowsucces(true);
    }
  }, []);
  

  return (
    <>
      <NavBar showLogin={false} />

      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-transparent to-transparent pb-12 pt-20 sm:pb-16 sm:pt-32 lg:pb-24 xl:pb-32 xl:pt-40">
        <div className="relative z-10">
          <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
            <svg
              className="h-[60rem] w-[100rem] flex-none stroke-blue-600 opacity-20"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                  width="200"
                  height="200"
                  x="50%"
                  y="50%"
                  patternUnits="userSpaceOnUse"
                  patternTransform="translate(-100 0)"
                >
                  <path d="M.5 200V.5H200" fill="none"></path>
                </pattern>
              </defs>
              <svg x="50%" y="50%" className="overflow-visible fill-blue-50">
                <path
                  d="M-300 0h201v201h-201Z M300 200h201v201h-201Z"
                  strokeWidth="0"
                ></path>
              </svg>
              <rect
                width="100%"
                height="100%"
                strokeWidth="0"
                fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"
              ></rect>
            </svg>
          </div>
        </div>
        <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 ">
          <div className="mx-auto max-w-2xl text-center">
            <div className="shadow-inner py-5">
              {showsucces && (
                <div
                  className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md my-4"
                  role="alert"
                >
                  <div className="text-center">
                    <div>
                      <p className="font-bold">Succesfully Sign up</p>
                      <p className="text-sm">Please login</p>
                    </div>
                  </div>
                </div>
              )}

              <h1 className="my-10 text-3xl font-bold text-gray-700">
                Upload your image! To get the prompt
              </h1>


              <h1 className="pt-7 font-bold">Login with Google</h1>
              <button
                className="isomorphic-link isomorphic-link--internal inline-flex items-center justify-center gap-2 rounded-xl  px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={async () => {
                  const result = await signIn("google", {
                    callbackUrl: "/dashboard",
                    redirect: false,
                  });
                }}
              >
                <svg
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  height={50}
                  width={50}
                >
                  <g clipPath="url(#clip0_13183_10121)">
                    <path
                      d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                      fill="#3F83F8"
                    ></path>
                    <path
                      d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                      fill="#34A853"
                    ></path>
                    <path
                      d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                      fill="#FBBC04"
                    ></path>
                    <path
                      d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                      fill="#EA4335"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_13183_10121">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0.5)"
                      ></rect>
                    </clipPath>
                  </defs>
                </svg>
              </button>

              <div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    action="#"
                  >

                    {/* 
                    Sign up form
                    */}

                    {/* <div>
                      <label
                        htmlFor="email"
                        className="flex items-center justify-between"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Password
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          required
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="ml-5 w-10 h-10 p-2"
                        >
                          {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <p>Don&apos;t have an account?</p>
                      <Link className="text-sky-400" href={"sign-up"}>
                        Create one
                      </Link>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="isomorphic-link isomorphic-link--internal inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        Sign in
                      </button>
                    </div> */}


                    {error && (
                      <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                      >
                        <strong className="font-bold">SignupError: </strong>
                        <br />
                        <span className="block sm:inline">{error}</span>
                        <span
                          onClick={() => setError("")}
                          className="absolute top-0 bottom-0 right-0 px-4 py-3"
                        >
                          <svg
                            className="fill-current h-6 w-6 text-red-500"
                            role="button"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <title>Close</title>
                            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                          </svg>
                        </span>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;
