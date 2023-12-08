"use client";

import styles from './navbar.module.css'
import { useContext, useState } from 'react';
import Link from 'next/link';
import Modal from '../modals/search/Modal';
import User from './googleAuth/LoginOrRegister';

export interface Manga {
    id: number,
    name: string,
    description: string,
    tags: string,
    cape_url: string,
    note: string, 
    mal_id: number,
    title: string,
    authors: string[],
    genres: string[]

}

export default function Navbar() {
    const[mangas, setMangas] = useState <Manga[]>([])
    const[searchValue, setSearchValue] = useState('')
    const[close, setClose] = useState(false)

    function handleChange(e: React.ChangeEvent < HTMLInputElement >) {
        setSearchValue(e.target.value.toLowerCase())
    }
    async function handleClick() {
        if(searchValue.length > 3) {
            let res = await fetch(`https://api.jikan.moe/v4/manga?q=${searchValue}&sfw`)
            let r = await res.json()
            setMangas(r.data)
        }
    }
    return (
        <header className={styles.header}>
            <Link href="/">
                <div className={styles.logo}>
                    <h1>Himeko</h1>
                </div>
            </Link>
            <div className={styles.search}>
                <input type='text' placeholder='Ex: One piece' onChange={handleChange}/>
                <button type='submit' onClick={handleClick}>search</button>
            </div>
                {close == false ? (
                    <div className={styles.container}>
                    {mangas.map((manga) => (
                        <Modal key={manga.id} manga={manga} state={close} admin={false}/>
                    ))}
                </div>
                ) : ""}
            <div className={styles.login}>      
                <User /> 
            </div>
        </header>
    )
}
