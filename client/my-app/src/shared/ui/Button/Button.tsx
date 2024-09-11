import { cn } from '@/lib/utils'
import type { MouseEventHandler } from 'react'
import styles from './Button.module.css'

type types = 'button' | 'submit' | 'reset'

interface Props {
  children: any
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  type?: types
  disable?: boolean
}

export function CustomButton({
  children,
  onClick,
  className,
  type,
  disable,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(styles.button, className)}
      type={type}
      disabled={disable}
    >
      {children}
    </button>
  )
}
