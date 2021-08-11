import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'


export default function NavLink({to, children}) {

    const {asPath} = useRouter()

    const className = asPath === to ? 'active' : ''
    
    return (
        <Link href={to}>
            <a className={className}>
                {children}
            </a>
        </Link>
    )
}