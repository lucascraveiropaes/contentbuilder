interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <>
      <h2 className="text-3xl font-semibold mb-1">{ title }</h2>
      <p className="text-md text-gray-500">{ subtitle }</p>
    </>
  );
}
