"use client"

import { useState } from 'react'
import styles from './user.module.css'
import Link from 'next/link'

export default function User () { 
    const[email, setEmail] = useState()
    const[password, setPassword] = useState()

    function handleEmail(e) {
        setEmail(e.target.value)
    }
    function handlePassword(e) {
        setPassword(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                Aceept : "application/json",
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password})
        })
    }   
    return (
        <div className={styles.user_container}>
            <form method='post' onSubmit={handleSubmit}>
                <input type="email" placeholder='email' onChange={handleEmail}/>
                <input type="password" placeholder='password' onChange={handlePassword}/>
                <button type='submit'>Entrar</button>
                <p>Não tem uma conta ? cadastre-se<Link href="/register">aqui</Link>!</p>
            </form>
        </div>
    )
}