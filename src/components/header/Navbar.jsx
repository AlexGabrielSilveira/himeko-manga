"use client";

import Image from 'next/image'
import styles from './navbar.module.css'
import { useState } from 'react';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai'

export default function Navbar() {
    const[mangas, setMangas] = useState([])
    const[loading, setLoading] = useState(true)
    const[visibility, setVisibility] = useState(true)

    function handleChange(e) {
        const value = e.target.value
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
        setVisibility(false)
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
                <button onClick={handleClick}>X</button>
                {visibility == true ? (
                <div className={styles.response}>
                {loading == true ? '' : (
                    mangas?.map((manga) => (
                    // eslint-disable-next-line react/jsx-key
                    <Link href={`/manga/${manga.mal_id}`}>
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
                    ))
                )}
                </div>
                ) : ''}
            </div>
            <div className={styles.user}>
                <h2>Alex</h2>
            </div>
        </header>
    )
}