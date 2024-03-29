import "./globals.css";
import MainLayout from "./main-layout";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
