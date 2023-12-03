"use client";

import styles from './navbar.module.css'
import { useState } from 'react';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi'
import Modal from '../modals/search/Modal';
import User from './login/Login';


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
    const[visibility, setVisibility] = useState(true)

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
    function handleVibility() {
        setVisibility(!visibility)
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
                <h2 onClick={handleVibility}><GiHamburgerMenu /></h2>
                {visibility == false && 
                    <User /> 
                }
            </div>
        </header>
    )
}
