"use client";

import Image from 'next/image'
import styles from './navbar.module.css'
import { useState } from 'react';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai'
import User from './user/User';



export default function Navbar() {
    const[mangas, setMangas] = useState([])
    const[loading, setLoading] = useState(true)
    const[searchVisibility, setSearchVisibility] = useState(false)
    const[visibility, setVisibility] = useState(true)

    function handleChange(e) {
        let value = e.target.value
        if(value.length > 3) {
            fetch(`https://api.jikan.moe/v4/manga?q=${value}&sfw`)
            .then(res => res.json())
            .then(res => {
                setMangas(res.data)
                setLoading(false)
                setVisibility(true)
            })
        }
    }
    function handleClick() {
        setSearchVisibility(!searchVisibility)
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
                <input type='text' placeholder='Ex: One piece' onChange={handleChange} onClick={handleClick}/>
                    <div className={styles.response}>
                    {loading == true ? '' : (
                        mangas?.map((manga) => (
                        <Link href={`/manga/${manga.mal_id}`} onClick={handleClick} key={manga.mal_id}>
                            {searchVisibility == true ? (
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
                            ) : ''}
                        </Link>
                        ))
                    )}
                    </div>
            </div>
            <div className={styles.user}>
                <h2 onClick={handleVibility}>Entrar</h2>
                {visibility == false  ? (
                    <User />
                ): ""} 
            </div>
        </header>
    )
}