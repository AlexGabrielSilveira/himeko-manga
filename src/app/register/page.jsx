"use client"

import { useState } from 'react'
import styles from './register.module.css'

export default function Register() {
    const[username, setUsername] = useState()
    const[password, setPassword] = useState()


    function handleUsername(e) {
        setUsername(e.target.value)
    }
    function handlePassword(e) {
        setPassword(e.target.value)
    }

    async function handleSubmit(e) {
        let role = "USER"
        e.preventDefault()
        await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                Aceept : "application/json",
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ username, password, role}),
        })
    }
    return (
        <main className={styles.register_container}>
            <form method="post" onSubmit={handleSubmit}>
                <h1>REGISTRE-SE</h1>
                <input type="text" placeholder="Username" onChange={handleUsername}/>
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Password" onChange={handlePassword}/>
                <button type="submit">Enviar</button>
            </form>
        </main>
    )
}