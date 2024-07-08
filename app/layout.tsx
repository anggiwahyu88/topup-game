
import Container from "@/components/Container";
import "./globals.css";
import StoreProvider from "@/context/redux/store/StoreProvider";
import Navbar from "@/components/Navbar/page";

const defaultUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className="bg-dark">
          <Navbar />
          <Container>
            {children}
          </Container>
        </body>
      </html>
    </StoreProvider>
  );
}
