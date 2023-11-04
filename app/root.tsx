import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import clsx from "clsx";
import Header from "./components/Header";

export const links: LinksFunction = () => [];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Email AI</title>
        <Meta />
        <Links />
      </head>
      <body
        className={clsx(
          "bg-green-100 text-gray-800 font-sans mx-auto my-10",
          "flex flex-col items-center justify-start gap-4 max-w-[900px] px-4"
        )}
      >
        <Header />
        <Outlet />
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}
