import clsx from "clsx";

export type CardProps = {
  className?: string;
  children: React.ReactNode;
  header?: React.ReactNode;
};

export default function Card({
  children,
  className,
  header,
}: CardProps): JSX.Element {
  return (
    <article
      className={clsx(
        className,
        "bg-white p-4 rounded-md shadow-md",
        "min-w-[380px] flex flex-col gap-4"
      )}
    >
      {header ? (
        <header className="border-b-2 text-xl font-bold pb-1 ">{header}</header>
      ) : null}
      {children}
    </article>
  );
}
