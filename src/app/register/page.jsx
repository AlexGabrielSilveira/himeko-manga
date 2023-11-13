"use client"
import { useState } from 'react'
import styles from './register.module.css'
import { z } from 'zod'

export default function Register() {
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")
    const[email, setEmail] = useState("")
    const[message, setMessage] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: ""
    })

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
        const validateSchema = z.object({
            username: z.string().trim().min(3),
            password: z.string().trim().min(8),
            confirmPassword: z.string().trim().min(8),
            email: z.string().trim().email()
        })
        const parsedValidate = validateSchema.safeParse({ username, password, confirmPassword, email})
        if(!parsedValidate.success) {
            const formatted = parsedValidate.error.format()
            return setMessage({
                username: formatted.username._errors[0],
                password: formatted.password._errors[0],
                confirmPassword: formatted.confirmPassword._errors[0],
                email: formatted.email._errors[0]
            })
        }
    }
    async function handleSubmit(e) {
        e.preventDefault()
        validate()
        await fetch(process.env.NEXT_PUBLIC_API_URL + 'auth/register', {
            method: 'POST',
            headers: {
                Accept : "application/json",
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ username, password, email}),
        })
    }
    return (
        <main className={styles.register_container}>
            <form method="post" onSubmit={handleSubmit}>
                <h1>REGISTRE-SE</h1>
                <input type="text" placeholder="Username" onChange={handleUsername}/>
                <p className={styles.message_err}>{message.username}</p>
                <input type="email" placeholder="Email" onChange={handleEmail}/>
                <p className={styles.message_err}>{message.email}</p>
                <input type="password" placeholder="Password" onChange={handlePassword}/>
                <p className={styles.message_err}>{message.password}</p>
                <input type="password" placeholder="Confirm password" onChange={handleConfirmPassword}/>
                <p className={styles.message_err}>{message.confirmPassword}</p>
                <button type="submit">Enviar</button>
            </form>
        </main>
    )
}