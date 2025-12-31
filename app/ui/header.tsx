'use client';

import { TypeAnimation } from 'react-type-animation';

interface HeaderProps {
  title: string,
  staticText: boolean
}

export function Header({ title, staticText }: HeaderProps) {
  if (staticText) {
    return <span className="text-[2em] inline-block"> {title} </span>;
  } else {
    return <TypeAnimation
      sequence={[
        title,
        500,
      ]}
      wrapper="span"
      speed={40}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={0}
    />
  }
}
