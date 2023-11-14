"use client";

import Image from 'next/image'
import styles from './navbar.module.css'
import { useState } from 'react';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import Infos from './infos/infos';

export default function Navbar() {
    const[mangas, setMangas] = useState([])
    const[searchValue, setSearchValue] = useState([])
    const[close, setClose] = useState(false)
    const[visibility, setVisibility] = useState(true)

    function handleChange(e) {
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
    function handleClose() {
        setClose(!close)
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
                        <Link href={`${manga.type}/${manga.mal_id}`} onClick={handleClose}>
                            <div key={manga.mal_id} className={styles.response_container}>
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
                            </div>
                        </Link>
                    ))}
                </div>
                ) : ""}
            <div className={styles.login}>
                <h2 onClick={handleVibility}><GiHamburgerMenu /></h2>
                {visibility == false  ? (
                    <Infos />
                ): ""} 
            </div>
        </header>
    )
}
