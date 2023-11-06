"use client"

import { useState } from 'react'
import styles from './register.module.css'

export default function Register() {
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")
    const[email, setEmail] = useState("")
    const[message, setMessage] = useState()

    function handleUsername(e) {
        setUsername(e.target.value)
    }
    function handleConfirmPassword(e) {
        setConfirmPassword(e.target.value)
    }
    function handlePassword(e) {
        setPassword(e.target.value)
    }
    function handleEmail(e) {
        setEmail(e.target.value)
    }
    function validate() {
        const userInfos = {
            username: username == '' || username == undefined || username == null || username.length <= 3,
            email: email == '' || email == undefined || email == null,
            password: password !== confirmPassword || password.length && confirmPassword.length < 8 || password && confirmPassword === undefined || password && confirmPassword == null || password.length !== confirmPassword.length,
        }

        if(userInfos.password || userInfos.username || userInfos.email) {
            return setMessage('Algo parece errado, confira suas credenciais!')
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        validate()
        await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                Aceept : "application/json",
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ username, password, email}),
        })
    }
    return (
        <main className={styles.register_container}>
            <h3 className={styles.message_err}>{message}</h3>
            <form method="post" onSubmit={handleSubmit}>
                <h1>REGISTRE-SE</h1>
                <input type="text" placeholder="Username" onChange={handleUsername}/>
                <input type="email" placeholder="Email" onChange={handleEmail}/>
                <input type="password" placeholder="Password" onChange={handlePassword}/>
                <input type="password" placeholder="Confirm password" onChange={handleConfirmPassword}/>
                <button type="submit">Enviar</button>
            </form>
        </main>
    )
}