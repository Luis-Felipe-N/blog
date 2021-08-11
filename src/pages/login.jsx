import Head from 'next/head'
import Link from 'next/link'

import Sing from '../components/Sing'
import { Button } from '../components/Button'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'


export default function login() {
    const [ email, setEmail ] = useState()
    const [ senha, setSenha ] = useState()

    const {singInEmailPassword} = useAuth()

    function handleSingIn(e) {
        e.preventDefault()

        singInEmailPassword(email, senha)

    }


    return (
       <Sing>
           <Head>
                <title>
                    BlogTech | Login
                </title>
           </Head>
           <h1>Entrar</h1>
            <form onSubmit={handleSingIn}>
            <label>
                    Email: 
                    <input onChange={({target})=>setEmail(target.value)} value={email} placeholder="email@gmail.com" type="email" />
                </label>

                <label>
                    Senha: 
                    <input onChange={({target})=>setSenha(target.value)} value={senha} placeholder="Senha123" type="password" />
                </label>
                <Button>Entrar</Button>
                <p>Não tem uma conta?<Link href="/singup">Cadastre-se</Link></p>
            </form>
       </Sing>
    )
}