import { cn } from '@/shared'
import styles from './MiniProfile.module.css'
import { memo } from 'react'

interface Props {
    name: string
    avatar: string
    login: string
    className?: string
}

export const MiniProfile = memo(({ name, avatar, login, className }: Props) => {
  return (
    <a className={cn(styles.container, className)} href={`/${login}`}>
      <img src={avatar} alt="avatar" className={styles.avatar} loading="lazy" />
      <div className={styles.profile_info}>
        <h1 className={styles.name}>{name}</h1>
        <div className={styles.login}>@{login}</div>
      </div>
    </a>
  );
});