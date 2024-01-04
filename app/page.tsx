import Image from "next/image";
import Link from "next/link";
import logo from "@/public/icons/logo.svg";
import rootImage from "@/public/pa_root_image.jpg";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    // make page doesnt scroll
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <header className="flex justify-center items-center p-6">
          <Image src={logo} alt="PanelAdmin Logo" width="150" height="100" />
        </header>
        <main className="flex flex-col items-center justify-center py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-[10rem]">
              <div className="flex flex-col justify-center space-y-4 text-center w-full">
                <div className="space-y-2">
                  <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-gray-800">
                    Welcome to Our Community
                  </h2>
                  <p className="max-w-[600px] text-gray-600 md:text-lg lg:text-base xl:text-lg">
                    Join us in our mission to make the world a better place. Get
                    involved, contribute, and let's make a difference together.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 hover:bg-gray-900/90"
                    href="/auth/signIn"
                  >
                    Sign In
                  </Link>
                </div>
              </div>

              <Image
                src={rootImage}
                alt="Community Image"
                width="750"
                height="310"
                className="rounded-md shadow-md"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
