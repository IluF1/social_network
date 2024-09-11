import { cn } from '@/shared'
import type { ChangeEventHandler, ReactNode } from 'react'
import styles from './Input.module.css'

interface Props {
  children: ReactNode
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  className?: string
  type?: 'text' | 'password' | 'email' | 'number'
  error?: boolean
  required?: boolean
}

export function CustomInput({
  children,
  value,
  onChange,
  className,
  type = 'text',
  error,
  required = false,
}: Props) {
  return (
    <input
      placeholder={typeof children === 'string' ? children : ''}
      value={value}
      required={required}
      onChange={onChange}
      className={cn(error ? styles.error : styles.customInput, className)}
      type={type}
    />
  )
}
