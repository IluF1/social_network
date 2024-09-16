import { useEffect, useState } from "react"

interface Props {
    children: React.ReactNode
}

export const HideComponentOnPage = ({ children }: Props) => {
    const [hide, setHide] = useState<boolean>(false)
    useEffect(() => {
        if(window.location.pathname === '/auth' || window.location.pathname === '/registration') { 
            setHide(true)
        } else {
            setHide(false)
        }
    }, [hide])
    return hide ? null : children
}