import Link from 'next/link'
import styles from '../styles/components/Header.module.scss'
import { Button } from './Button'
import NavLink from './NavLink'
import useAuth from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import { useClickOutSide } from '../hooks/useClickOutSide'
import {BiUserCircle} from 'react-icons/bi'

export default function Header() {
    const [ menuIsOpen, setMenuIsOpen ] = useState(false)

    const clickOutSide = useClickOutSide()

    const { user, logOut } = useAuth()


    useEffect(() => {
        if (menuIsOpen) {
            const elem = document.querySelector('[data-menu]')
            console.log(elem)
            clickOutSide(elem, menuIsOpen, setMenuIsOpen)
        }
    }, [menuIsOpen])


    const handleLogOutUser = () => {
        logOut()
    }


    return (
        <header className={styles.header}>
            <Link href="/">
                <a>
                    <h1 className={styles.logo} >BlogTech</h1>
                </a>
            </Link>
            <nav className={styles.menu}>
                <ul data-menu className={menuIsOpen ? styles.active : ''}>
                    <li>
                        <NavLink to="/">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/sobre">
                            HTML/CSS
                        </NavLink>
                    </li>
                    <li>
                    <NavLink to="/Política">
                            JAVASCRIPT
                        </NavLink>
                    </li>
                    <li>
                    <NavLink to="/posts">
                            FRAMEWORK
                        </NavLink>
                    </li>
                    <li>

                        {
                            user ?
                            <Button onClick={handleLogOutUser}>Log Out</Button>
                            : 
                            (<Link href="/login">
                            <Button>Login</Button>
                             </Link>)
                        }
                    </li>
                </ul>
            </nav>
            <Button data-menu-mobile onClick={()=>setMenuIsOpen(!menuIsOpen)}>
                    Menu
            </Button>
        </header>
    )
}