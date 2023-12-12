"use client";

import styles from './navbar.module.css'
import { useState } from 'react';
import Link from 'next/link';
import User from './googleAuth/LoginOrRegister';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';

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
    const[value, setValue] = useState('')

    async function handleChange(e: React.ChangeEvent < HTMLInputElement >) {
        setValue(e.target.value)
        if(value.length > 3) {
            let res = await fetch(`https://api.jikan.moe/v4/manga?q=${value}&sfw`)
            let r = await res.json()
            setMangas(r.data)
        }
    }
    function handleClick() {
        setValue('')
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
            </div>
            <div className={styles.container}>
                <div className={styles.response}>
                    {value != '' ?  mangas?.map(manga => (
                    <Link href={`/manga/${manga.mal_id}`} className={styles.card_response} key={manga.mal_id} onClick={handleClick}>
                        <Image src={manga.images.jpg.image_url} height={120} width={80} alt='manga'/>
                        <ul className={styles.response_list}>
                            <li><strong>{manga.title}</strong></li>
                            <li><strong>Autor: </strong>{manga.authors[0]?.name}</li>
                            <li><strong>tags: </strong>
                            {manga.genres.map(genre => (
                                <span key={genre.mal_id}> {genre.name} </span>
                                ))}
                            </li>
                            <li><strong>score<AiFillStar />: </strong>{manga.score}</li>
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

