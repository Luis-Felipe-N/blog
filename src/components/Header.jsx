import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import styles from '../styles/components/Header.module.scss'
import { Button } from './Button'
import NavLink from './NavLink'
import useAuth from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import { useClickOutSide } from '../hooks/useClickOutSide'

export default function Header() {
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ menuIsOpen, setMenuIsOpen ] = useState(false)

    const clickOutSide = useClickOutSide()

    const { singInEmailPassword } = useAuth()

    useEffect(() => {
        if (menuIsOpen) {
            const elem = document.querySelector('[data-menu]')
            console.log(elem)
            clickOutSide(elem, menuIsOpen, setMenuIsOpen)
        }
    }, [])

    return (
        <header className={styles.header}>
            <Link href="/">
                <a>
                    <h1 className={styles.logo} >BlogTech</h1>
                </a>
            </Link>
            <nav className={styles.menu}>
                <ul data-menu className={menuIsOpen && styles.active}>
                    <li>
                        <NavLink to="/">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/sobre">
                            Sobre
                        </NavLink>
                    </li>
                    <li>
                    <NavLink to="/Política">
                            Política
                        </NavLink>
                    </li>
                    <li>
                    <NavLink to="/posts">
                            Posts
                        </NavLink>
                    </li>
                    <li>
                        <Link href='/login'>
                            <Button>Login</Button>
                        </Link>
                    </li>
                </ul>
            </nav>
            <Button data-menu-mobile onClick={()=>setMenuIsOpen(!menuIsOpen)}>
                Menu
            </Button>
        </header>
    )
}