"use client";
import {
  CheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import NavBar from "../ui/NavBar/NavBar";

import "../globals.css";
import BackgroundShape from "../ui/Components/BackgroundShape";

function DashboardPage() {
  const [imageForm, setImageForm] = useState<File | null | Blob>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [textResponse, setTextResponse] = useState<string | null>(null);
  const [textResponseSpanish, setTextResponseSpanish] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isCopyText, setIsCopyText] = useState<boolean>(false);
  const [isCopySpanishText, setIsCopySpanishText] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      //Imge to send to the server as a file
      setImageForm(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setTextResponse(null);
    setTextResponseSpanish(null);
    setError(null);
    setLoading(true);

    // Create a new FormData instance
    const formData = new FormData();

    // Append the image file to the form data
    if (imageForm) {
      formData.append("image", imageForm);
    }

    // Fetch request
    const response = await fetch("/api/image-upload", {
      method: "POST",
      body: formData, // send formData instead of JSON
    });

    if (response?.ok) {
      const data = await response.json();
      const message = data.message as string;
      setTextResponse(message);

      if (message) {
        // Fetch request
        const responseSpanish = await fetch("/api/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message,
          }),
        });

        const dataSpanish = await responseSpanish.json();

        if (responseSpanish?.ok) {
          const messageSpanish = dataSpanish.message as string;
          setTextResponseSpanish(messageSpanish);
        }
      }

      setLoading(false);

      // console.log(
      //   "Message response:",
      //   message,
      //   "Spanish message response:",
      //   message
      // );
    } else {
      const data = await response.json();
      const message = data.message as string;
      setError(message);
      console.log("error", response);
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      if (textResponse) {
        await navigator.clipboard.writeText(textResponse);
        setIsCopyText(true);
        setTimeout(() => setIsCopyText(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleCopySpanish = async () => {
    try {
      if (textResponseSpanish) {
        await navigator.clipboard.writeText(textResponseSpanish);
        setIsCopySpanishText(true);
        setTimeout(() => setIsCopySpanishText(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <NavBar showLogOut={true} />
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-transparent to-transparent pb-12 pt-20 sm:pb-16 sm:pt-32 lg:pb-24 xl:pb-32 xl:pt-40">
        <BackgroundShape />
        <div className="relative z-20 mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className=" flex  justify-center bg-no-repeat bg-cover  items-center">
              <div
                style={{ marginTop: "50px" }}
                className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 margin-responsive"
              >
                <div className="text-center">
                  <h2 className="mt-5 text-3xl font-bold text-gray-900">
                    Upload your image!
                  </h2>
                  <h3 className="mt-5 text-2xl font-bold text-gray-500">
                    To get the info
                  </h3>
                </div>

                {error && (
                  <div
                    className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md my-4"
                    role="alert"
                  >
                    <div className="text-center">
                      <div>
                        <p className="font-bold">Error: </p>
                        <p className="text-sm">{error}</p>
                      </div>
                    </div>
                  </div>
                )}
                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-3"
                  action="#"
                >
                  <div className="grid grid-cols-1 space-y-2">
                    <label className="text-sm font-bold text-gray-500 tracking-wide">
                      Image here
                    </label>
                    <div className="flex items-center justify-center w-full ">
                      <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center cursor-pointer">
                        <div className="h-full w-full text-center flex flex-col items-center justify-center  ">
                          <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                            <Image
                              className="has-mask h-36 object-center my-5"
                              src={image ? (image as string) : "./defaultImage.svg"}
                              alt="freepik image"
                              height={300}
                              width={300}
                              priority
                            />
                          </div>
                          {!image && (
                            <>
                              <p className="pointer-none text-gray-500">
                                <span className="text-sm">Drag and drop</span>{" "}
                                files here <br /> or{" "}
                                <span className="text-green-600 hover:underline">
                                  select a file
                                </span>{" "}
                              </p>
                              <p className="text-gray-300 text-sm">
                                .webp .jpeg .png .jpg
                              </p>
                            </>
                          )}
                        </div>

                        <input
                          className="pt-10"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          name="imageForm"
                        />
                      </label>
                    </div>

                    <div style={{ marginTop: "20px" }}>
                      <button
                        disabled={!image}
                        type="submit"
                        className="isomorphic-link isomorphic-link--internal inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-lg font-semibold text-white shadow-sm transition-all duration-150 hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                      >
                        Upload
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    {loading ? (
                      <div>Loading...</div> // This is your loading indicator
                    ) : (
                      <>
                        {textResponse && (
                          <div className="border rounded shadow p-5 flex justify-between">
                            <div>
                              <h2 className="mt-5 text-3xl font-bold text-gray-900 mb-5">
                                Description:
                              </h2>
                              <p style={{ whiteSpace: "pre-wrap" }}>
                                {textResponse}
                              </p>
                            </div>

                            <button
                              type="button"
                              className="-m-2.5 inline-flex justify-end rounded-md p-2.5 text-gray-700 border h-12"
                              onClick={handleCopy}
                            >
                              <span className="sr-only">Copy to clipboard</span>
                              {isCopyText ? (
                                <>
                                  {" "}
                                  <CheckIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                  <div className="absolute bg-white border p-2 mt-10 rounded shadow-lg">
                                    Copied to clipboard!
                                  </div>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <ClipboardDocumentListIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </>
                              )}
                            </button>
                          </div>
                        )}

                        {textResponseSpanish && (
                          <div className="border rounded shadow p-5 flex justify-between mt-5">
                            <div>
                              <h2 className="mt-5 text-3xl font-bold text-gray-900 mb-5">
                                Descripción:
                              </h2>
                              <p style={{ whiteSpace: "pre-wrap" }}>
                                {textResponseSpanish}
                              </p>
                            </div>

                            <button
                              type="button"
                              className="-m-2.5 inline-flex justify-end rounded-md p-2.5 text-gray-700 border h-12"
                              onClick={handleCopySpanish}
                            >
                              <span className="sr-only">Copy to clipboard</span>
                              {isCopySpanishText ? (
                                <>
                                  {" "}
                                  <CheckIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                  <div className="absolute bg-white border p-2 mt-10 rounded shadow-lg">
                                    Copied to clipboard!
                                  </div>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <ClipboardDocumentListIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DashboardPage;
