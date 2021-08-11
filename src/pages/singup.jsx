import { useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'

import Sing from '../components/Sing'
import { Button } from '../components/Button'
import useAuth from '../hooks/useAuth'


export default function singup() {
    const [ email, setEmail ] = useState()
    const [ senha, setSenha ] = useState()
    const [ userName, setUserName ] = useState()
    
    const {createAcount} = useAuth()

    function handleCreatAcount(e) {
        e.preventDefault()

        createAcount(userName, email, senha)

    }

    return (
       <Sing>
           <Head>
                <title>
                    BlogTech | Cadastrar
                </title>
           </Head>
           <h1>Cadastrar-se</h1>
            <form onSubmit={handleCreatAcount}>
                <label>
                    Nome: 
                    <input onChange={({target})=>setUserName(target.value)} value={userName} placeholder="Luis" type="text" />
                </label>
                <label>
                    Email: 
                    <input onChange={({target})=>setEmail(target.value)} value={email} placeholder="email@gmail.com" type="email" />
                </label>

                <label>
                    Senha: 
                    <input onChange={({target})=>setSenha(target.value)} value={senha} placeholder="Senha123" type="password" />
                </label>
                <Button>Cadastrar</Button>
                <p>Já tem uma conta?<Link href="/login"> Faça login.</Link></p>
            </form>
       </Sing>
    )
}