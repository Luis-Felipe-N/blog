import Link from 'next/link'
import styles from '../styles/components/Header.module.scss'
import { Button } from './Button'
import NavLink from './NavLink'
import useAuth from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import { useClickOutSide } from '../hooks/useClickOutSide'
import {RiUserSmileLine} from 'react-icons/ri'
import { Router } from 'react-router-dom'

export default function Header() {
    const [ menuIsOpen, setMenuIsOpen ] = useState(false)
    const [ menuUserIsOpen, setMenuUserIsOpen ] = useState(false)

    const clickOutSide = useClickOutSide()

    const { user, logOut } = useAuth()


    useEffect(() => {
        if (menuIsOpen) {
            const elem = document.querySelector('[data-menu]')
            clickOutSide(elem, menuIsOpen, setMenuIsOpen)
        }

        if (menuUserIsOpen) {
            const elem = document.querySelector('[data-menu-user]')
            clickOutSide(elem, menuUserIsOpen, setMenuUserIsOpen)
        }
    }, [menuIsOpen, menuUserIsOpen, clickOutSide])


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
            <nav className={menuIsOpen ? `${styles.menu} ${styles.active}` : styles.menu}>
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
                    <li  className={styles.menu_profile}>
                        {
                            user ?
                            (<>
                                <button className={styles.button_icon} onClick={()=>setMenuUserIsOpen(!menuUserIsOpen)}>
                                    <RiUserSmileLine size="2.5rem" color="white"/>
                                </button>
                                <ul data-menu-user className={menuUserIsOpen ? `${styles.menu_user} ${styles.active}` : styles.menu_user} >
                                    <li>{user.name}</li>
                                    <li><Button onClick={handleLogOutUser} isInverse>Logout</Button></li>
                                </ul>

                            </>)
                            : 
                            <Button onClick={()=> {Router.push("/login")}}>Login</Button>
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