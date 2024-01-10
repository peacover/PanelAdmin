import Footer from "@/components/Footer/Footer";
import Header from "@/components/SideBar/Header";
import HeaderMobile from "@/components/SideBar/HeaderMobile";
import MarginWidthWrapper from "@/components/SideBar/MarginWidthWrapper";
import PageWrapper from "@/components/SideBar/PageWrapper";

import SideBar from "@/components/SideBar/SideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100">
      <SideBar />
      <main>
        <MarginWidthWrapper>
          <Header />
          <HeaderMobile />
          {/* <PageWrapper>{children}</PageWrapper> */}
          {children}
        </MarginWidthWrapper>
      </main>
      <Footer />
    </div>
  );
}
