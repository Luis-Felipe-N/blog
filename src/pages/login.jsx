import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

import Sing from '../components/Sing'
import { Button } from '../components/Button'
import {  useState } from "react";
import useAuth from '../hooks/useAuth'


export default function Login() {
    const [ email, setEmail ] = useState()
    const [ senha, setSenha ] = useState()
    const [ errorEmail, setErrorEmail ] = useState()
    const [ errorSenha, setErrorSenha ] = useState()


    const {singInEmailPassword} = useAuth()

    async function handleSingIn(e) {
        e.preventDefault()

        const response = await singInEmailPassword(email, senha)
        
        if ( response.sucess ) {
            Router.push('/')
        } else {
            if( response.code === 'password' ) {
                setErrorSenha(response.message)
                return
            }

            if( response.code === 'email' ) {
                setErrorEmail(response.message)
                return
            }
        }

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
                    <input onChange={({target})=>{
                        setEmail(target.value)
                        setErrorEmail('')
                        }
                        }
                        value={email}
                        placeholder="email@gmail.com"
                        type="email"
                    />
                    {errorEmail && <p className="erro">{errorEmail}</p>}
                </label>

                <label>
                    Senha: 
                    <input
                        onChange={({target})=>{
                            setSenha(target.value)
                            setErrorSenha('')
                        }} 
                        value={senha} 
                        placeholder="Senha123" 
                        type="password"
                    />
                    {errorSenha && <p className="erro">{errorSenha}</p>}
                </label>
                <Button>Entrar</Button>
                <p>Não tem uma conta?<Link href="/singup">Cadastre-se</Link></p>
            </form>
       </Sing>
    )
}