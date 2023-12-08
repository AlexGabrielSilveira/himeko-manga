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
                    <Image src={user.picture} width={40} height={40} onClick={handleVibility} alt="user logo" />
                    {options === true ? (
                    <ul>
                        <li>{user.name}</li>
                        <li>---------------</li>
                        <li><Link href="/perfil">Perfil</Link></li>
                        <li>Sair </li>
                    </ul>
                    ): ''}
                </div>
            ) : (<Link className={styles.login} href={googleOAuth.createLoginUrl()}><FaGoogle /> Entrar com Google </Link>)}
        </div>
    )
}