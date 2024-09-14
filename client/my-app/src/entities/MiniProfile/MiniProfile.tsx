import styles from './MiniProfile.module.css'

interface Props {
    name: string
    avatar: string
    login: string
}

export const MiniProfile = ({ name, avatar, login }: Props) => {
    return <a className={styles.container} href={`/${login}`}>
        <img src={avatar} alt="avatar" className={styles.avatar} loading="lazy"/>
        <h1 className={styles.name}>{name}</h1>
    </a>
}