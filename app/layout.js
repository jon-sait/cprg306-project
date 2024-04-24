import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./todo-list/_utils/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My To-do List",
  description: "A helpful tool to manage your life",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
