import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode,
  href: string
}

export default function Button({ children, href }: ButtonProps) {
  return (
    <Link
      className="flex gap-1 h-10 bg-black items-center justify-center rounded-md border transition-colors border-2 border-zinc-500/[.5] hover:border-white/[0.8] p-2"
      href={href}>
      {children}
    </Link>
  );
}
