import googleLogo from '@/app/assets/images/icons8-google.svg'
import { cn, CustomButton } from '@/shared'

import styles from './GoogleButton.module.css'

interface Props {
  className?: string
}

export function GoogleButton({ className }: Props) {
  return (
    <CustomButton type="button" className={cn(styles.button, className)}>
      <img src={googleLogo} alt="logo" className={styles.google_logo} />
      Войти с помощью Google
    </CustomButton>
  )
}
