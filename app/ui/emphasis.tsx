interface EmphasisProps {
  children: React.ReactNode
}

export function Emphasis({children}: EmphasisProps) {
  return <span className="text-gray-900 dark:text-gray-200"> {children} </span>;
}
