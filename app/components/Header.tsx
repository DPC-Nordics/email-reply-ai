import { Link } from "@remix-run/react";

import Card from "./Card";

export default function Header(): JSX.Element {
  return (
    <Card className="text-center w-full">
      <h1 className="text-3xl font-bold">
        <Link to="/">Accenture Email AI</Link>
      </h1>
      <p>
        Classify, summarise and generate reply for an Email using the power of
        AI.
      </p>
    </Card>
  );
}
