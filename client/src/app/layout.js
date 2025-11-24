import { Raleway } from "next/font/google";
import "./globals.css";
import { Navbar } from "../../components/Navbar/navbar";
import Footer from "../../components/footer";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata = {
  title: "Salon Mimi",
  description: "Online Booking Salon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>
        <Navbar />
        <main className="bg-gray-50 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
