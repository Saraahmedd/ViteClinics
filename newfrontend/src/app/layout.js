"use client"
import Header from "@/components/Header";
import "./globals.css";
import localFont from "next/font/local";

import { ReduxProvider } from "./redux/provider";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const myFont = localFont({
  src: [
    {
      path: "../../public/fonts/FreeSans.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/FreeSansBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/FreeSansOblique.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/FreeSansBoldOblique.woff",
      weight: "600",
      style: "italic",
    },
  ],
});

export default function RootLayout({ children }) {
  useEffect(() => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.setAttribute("autocomplete", "off");
    });

    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
      form.setAttribute("autocomplete", "off");
    });
  });

  return (
    <html lang="en" className="dark">
      <head>
        <title>Vite Clinics</title>
      </head>
      <body className={myFont.className + " min-h-screen flex flex-col "}>
        <ReduxProvider>{children} </ReduxProvider>
        {/* <div className="flex-1 grow"></div> */}
        <Footer />
      </body>
    </html>
  );
}
