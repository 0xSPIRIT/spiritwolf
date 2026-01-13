import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function genRoomCode() {
  let code = "";
  const digits = 4;

  for (let i = 0; i < digits; i++) {
    const value = Math.floor(Math.random() * 16);
    const ascii = (value < 10) ? (48 + value) : (65 + value);
    code += String.fromCharCode(ascii);
  }

  return code;
}

