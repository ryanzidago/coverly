import "./globals.css";
import { Inter } from "next/font/google";
import Home from "./home";
import AuthProvider from "./auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Coverly",
  description: "Build your resume faster",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Home />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
