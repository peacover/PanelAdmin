import Image from "next/image";
import logo from "@/public/icons/logo.svg";
import SignInForm from "@/components/AuthLayout/SignIn/SignInForm";

export default function Home() {
  return (
    // <div className="min-h-screen bg-gray-100 pt-[4.5rem]">
    //   <header className="flex justify-center items-center p-4 md:p-6">
    //     <Image
    //       src={logo}
    //       alt="PanelAdmin Logo"
    //       priority={true}
    //       width="0"
    //       height="0"
    //       sizes="100vw"
    //       className="w-[150px] h-[100px]"
    //     />
    //   </header>
    //   <div className="flex flex-col justify-center items-center mt-[5rem]">
    //     <SignInForm />
    //   </div>
    // </div>
    <div className="min-h-screen bg-gray-100 pt-[4.5rem]">
    <header className="flex justify-center items-center p-4 md:p-6">
      <Image
        src={logo}
        alt="PanelAdmin Logo"
        priority={true}
        width="0"
        height="0"
        sizes="100vw"
        className="w-[150px] h-[100px]"
      />
    </header>
    <div className="flex flex-col justify-center items-center mt-[5rem]">
      <SignInForm />
    </div>
  </div>
  );
}
