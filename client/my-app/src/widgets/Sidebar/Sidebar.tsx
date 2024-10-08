import { useEffect, useState } from 'react'
import styles from './Sidebar.module.css'
import { NavElement } from '@/shared/ui/NavElement/NavElement'
import {
    AlertCircle,
    BotIcon,
    Contact,
    Home,
    MessageCircle,
    Newspaper,
    Pencil
} from 'lucide-react'
import { ExitIcon, ResumeIcon } from '@radix-ui/react-icons'
import { MiniProfile } from '@/entities/MiniProfile/MiniProfile'
import { useAppSelector } from '@/shared/Helpers/Hooks/useAppSelector'
import Cookies from 'js-cookie'
import { token } from '@/shared/Helpers/constansts'
import { useAppDispatch } from '@/shared/Helpers/Hooks/useAppDispatch'
import { logoutUser } from '../Header/model/user.slice'

export const Sidebar = () => {
    const user = useAppSelector((state) => state.user.user)
    const dispatch = useAppDispatch()

    const logout = async () => {
        try {
            dispatch(logoutUser(token || ''))

            Cookies.remove('sessionToken')

            window.location.reload()
        } catch (error) {
            console.error('Ошибка при выходе:', error)
        }
    }

    return (
        <aside>
            <div className={styles.container}>
                {token ? (
                    <MiniProfile
                        name={user.name}
                        login={user.login}
                        avatar={user.avatar}
                    />
                ) : null}
                <NavElement
                    children="Главная"
                    link="/"
                    icon={<Home />}
                    className=" text-xl mt-6"
                />
                <NavElement
                    children="Чаты"
                    link="/chats"
                    icon={<MessageCircle />}
                    className=" text-xl mt-4"
                />
                <NavElement
                    children="Друзья"
                    link="/friends"
                    icon={<Contact />}
                    className=" text-xl mt-4"
                />
                <NavElement
                    children="Сообщества"
                    link="/vacancys"
                    icon={<ResumeIcon />}
                    className=" text-xl mt-4"
                />
                <NavElement
                    children="Создать пост"
                    link="/createPost"
                    icon={<Pencil />}
                    className=" text-xl mt-4"
                />
                <NavElement
                    children="Новости"
                    link="/news"
                    icon={<Newspaper />}
                    className=" text-xl mt-4"
                />
                <NavElement
                    children="Тех.поддержка"
                    link="/help"
                    icon={<BotIcon />}
                    className=" text-xl mt-4"
                />
                <NavElement
                    children="О нас"
                    link="/about"
                    icon={<AlertCircle />}
                    className=" text-xl mt-4"
                />
                {token ? (
                    <button onClick={() => logout()}>
                        <ExitIcon width={30} height={30} className=" mt-56" />
                    </button>
                ) : null}
            </div>
        </aside>
    )
}
