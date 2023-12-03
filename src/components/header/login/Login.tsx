"use client";

import React, { useState } from 'react'
import styles from './user.module.css'
import Link from 'next/link'
import { GoogleOAuth } from '@/services/GoogleOAuth';
const googleOAuth = new GoogleOAuth()

export default function User () { 
    return (
        <div className={styles.container}>
            <Link href={googleOAuth.createLoginUrl()}>ENTRAR COM GOOGLE</Link>
        </div>
    )
}