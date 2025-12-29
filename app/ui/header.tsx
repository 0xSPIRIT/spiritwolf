'use client';

import { TypeAnimation } from 'react-type-animation';

interface HeaderProps {
  title: string
}

export function Header({title}: HeaderProps) {
  return <TypeAnimation
  sequence={[
    title,
    500,
  ]}
  wrapper="span"
  speed={40}
  style={{ fontSize: '2em', display: 'inline-block' }}
  repeat={Infinity}
  />
}
