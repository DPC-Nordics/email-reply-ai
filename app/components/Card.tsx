import clsx from "clsx";

export type CardProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Card({ children, className }: CardProps): JSX.Element {
  return (
    <article
      className={clsx(
        className,
        "bg-white p-4 rounded-md shadow-md",
        "min-w-[380px] flex flex-col gap-4"
      )}
    >
      {children}
    </article>
  );
}
