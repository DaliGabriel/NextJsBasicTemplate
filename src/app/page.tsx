import Link from "next/link";
import NavBar from "./ui/NavBar/NavBar";
import { getServerSession } from "next-auth";
import BackgroundShape from "./ui/Components/BackgroundShape";

async function HomePage() {
  const session = await getServerSession();

  return (
    <>
      <NavBar
        showLogin={!session}
        showDashboard={!!session}
        showLogOut={!!session}
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-transparent to-transparent pb-12 pt-20 sm:pb-16 sm:pt-32 lg:pb-24 xl:pb-32 xl:pt-40">
        
        <BackgroundShape />

        <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span className="typewriter">
                <span>I</span>
                <span>s</span>
                <span> </span>
              </span>
              <br />
              <span className="text-green-500 typewriter">
                <span>H</span>
                <span>e</span>
                <span>a</span>
                <span>l</span>
                <span>t</span>
                <span>h</span>
                <span>y</span>
              </span>
            </h1>
            <div className="mt-20 flex items-center justify-center gap-x-6">
              <Link
                href={!!session ? "dashboard" : "/login"}
                className="isomorphic-link isomorphic-link--internal inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-lg font-semibold text-white shadow-sm transition-all duration-150 hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Start
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
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
