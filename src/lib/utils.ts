type ClassValue = string | number | boolean | undefined | null | { [key: string]: any }
type ClassArray = ClassValue[]
type ClassProp = ClassValue | ClassArray
import { twMerge } from "tailwind-merge"
import { clsx } from "clsx"

export function cn(...inputs: ClassProp[]) {
  return twMerge(clsx(inputs))
}