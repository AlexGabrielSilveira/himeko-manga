"use client";

import styles from './navbar.module.css'
import { useState } from 'react';
import Link from 'next/link';
import User from './googleAuth/LoginOrRegister';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import Input from '../inputs/Input';
import { api } from '@/services/api';
import localFont from '@next/font/local';

const introRust = localFont({
    src: '../../assets/fonts/introRust.otf',
    display: 'swap',
})
const introHead = localFont({
    src: '../../assets/fonts/introHead.otf',
    display: 'swap',
})

export interface Manga {
    id: number,
    name: string,
    description: string,
    tags: string,
    cape_url: string,
    note: string, 
    mal_id: number,
    title: string,
    authors: string, 
    genres: string[]

}

export default function Navbar() {
    
    const[mangas, setMangas] = useState <Manga[]>([])
    const[value, setValue] = useState('')

    async function handleChange(e: React.ChangeEvent < HTMLInputElement >) {
        setValue(e.target.value)
        try {
            if(value.length > 3) {
                let res = await api.get(`/manga/search/${value}`)
                setMangas(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    function handleClick() {
        setValue('')
    }
    return (
        <header className={`${styles.header}  ${introRust.className}`}>
            <Link href="/">
                <div className={styles.logo}>
                    <h1>H<span className={styles.name}>imeko</span></h1>
                </div>
            </Link>
            <div className={styles.search}>
                <Input type="text" placeholder='Ex: One piece' onChange={handleChange} />
            </div>
            <div className={styles.container}>
                <div className={`${styles.response} ${introHead.className}`}>
                    {value != '' ?  mangas?.map(manga => (
                    <Link href={`/manga/${manga.id}`} className={styles.card_response} key={manga.mal_id} onClick={handleClick}>
                        <Image src={manga.cape_url} height={120} width={80} alt='manga'/>
                        <ul className={styles.response_list}>
                            <li><strong>{manga.name}</strong></li>
                            <li><strong>Autor: </strong>{manga.authors}</li>
                            <li><strong>tags: </strong>{manga.tags}</li>
                            <li><strong>score<AiFillStar />: </strong>{manga.note}</li>
                        </ul>
                    </Link>
                    )): ''}
                </div>
            </div>
            <div className={styles.login}>      
                <User /> 
            </div>
        </header>
    )
}

