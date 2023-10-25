"use client"

import { useState } from 'react'
import styles from './user.module.css'
import Link from 'next/link'

export default function User () {    
    return (
        <div className={styles.user_container}>
            <form>
                <input type="text" placeholder='username'/>
                <input type="password" placeholder='password'/>
                <button type='submit'>Entrar</button>
                <p>Não tem uma conta ? cadastre-se<Link href="/register">aqui</Link>!</p>
            </form>
        </div>
    )
}