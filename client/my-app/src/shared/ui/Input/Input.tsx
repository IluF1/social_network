import hideImg from '@/app/assets/images/hide.png'
import showImg from '@/app/assets/images/show.png'
import { cn } from '@/shared'
import { type ChangeEventHandler, type ReactNode, useState } from 'react'
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
  const [show, setShow] = useState<boolean>(false)
  return (
    <div>
      <input
        placeholder={typeof children === 'string' ? children : ''}
        value={value}
        required={required}
        onChange={onChange}
        className={cn(error ? styles.error : styles.customInput, className)}
        type={show ? 'text' : type}
      />
      {type === 'password'
        ? (
            <button
              type="button"
              onClick={() => setShow(!show)}
              className=" float-right -mt-10 mr-5"
            >
              <img
                src={show ? showImg : hideImg}
                className={styles.dark}
              />
            </button>
          )
        : null}
    </div>
  )
}
