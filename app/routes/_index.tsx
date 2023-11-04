import { type ActionFunctionArgs } from "@remix-run/node";
import Card from "~/components/Card";

export async function loader() {
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  return null;
}

export type IndexAction = typeof action;

export default function Index() {
  return (
    <>
      <Card className="flex-1">{}</Card>
      <Card className="flex-1">{}</Card>
    </>
  );
}
