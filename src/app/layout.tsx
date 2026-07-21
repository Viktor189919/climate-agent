import "./globals.css";
import Header from "@/components/header"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className="flex flex-col min-h-screen min-w-screen bg-gray-400">
        <Header />
        {children}
      </body>
    </html>
  );
}
