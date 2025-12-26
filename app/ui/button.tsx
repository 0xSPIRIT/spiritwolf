interface ButtonProps {
  children: React.ReactNode,
  href: string
}

export default function Button({children, href}: ButtonProps) {
  return <a
  className="flex h-10 items-center justify-center rounded-md border-solid border-2 transition-colors border-white/[.145] hover:border-[#aaaaaa] md:w-[6rem]"
  href={href}>
  {children}
  </a>
}
