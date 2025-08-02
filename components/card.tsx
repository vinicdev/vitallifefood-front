interface CardProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Card({ children, onSubmit }: CardProps) {
  return (
    <form
      className="w-[400px] min-h-[280px] card p-6 rounded-lg max-sm:p-2 max-sm:w-[95%]"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-8">{children}</div>
    </form>
  );
}
