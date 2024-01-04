import Footer from "@/components/Footer/Footer";
import SideBar from "@/components/SideBar/SideBar";

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="bg-gray-100">
        <h1>Root Layout</h1>
        <SideBar />
        {children}
        <Footer />
      </div>
    );
  }
  