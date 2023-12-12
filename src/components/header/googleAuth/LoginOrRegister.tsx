"use client";

import React, { useContext, useState } from 'react'
import styles from './user.module.css'
import Link from 'next/link'
import { GoogleOAuth } from '@/services/GoogleOAuth';
import { AuthContext } from '@/contexts/AuthContext';
import { FaGoogle } from "react-icons/fa";
import Image from 'next/image';
const googleOAuth = new GoogleOAuth()

export default function User () { 
const { user } = useContext(AuthContext)
    const[options, setOptions] = useState(false)
    function handleVibility() {
        setOptions(!options)
    }

    return (
        <div className={styles.container}>
            {user != null ? (
                <div className={styles.user}>
                    <h2 onClick={handleVibility}>{user.name}</h2>
                    {options === true ? (
                    <ul>
                        <li><Link href="/perfil">Perfil</Link></li>
                        <li>Sair </li>
                    </ul>
                    ): ''}
                </div>
            ) : (<Link className={styles.login} href={googleOAuth.createLoginUrl()}><FaGoogle /> <span className={styles.login_text}>Entrar com Google</span> </Link>)}
        </div>
    )
}