"use client";

import Image from 'next/image'
import styles from './navbar.module.css'
import { useState } from 'react';
import Link from 'next/link';
import { SiMyanimelist } from 'react-icons/si'

export default function Navbar() {
    const[mangas, setMangas] = useState([])
    const[loading, setLoading] = useState(true)
    function handleChange(e) {
        const value = e.target.value
        if(value.length > 3) {
            fetch(`https://api.jikan.moe/v4/manga?q=${value}&sfw`)
            .then(res => res.json())
            .then(res => {
                setMangas(res.data)
                setLoading(false)
            })

        }
    }
    
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Image  src="/himeko_logo.png" height="720" width="1280" alt='logo'/>
                <h1>Himeko</h1>
            </div>
            <div className={styles.search}>
                <input type='search' placeholder='Ex: One piece' onChange={handleChange}/>
                <div className={styles.response}>
                {loading == true ? '' : (
                    mangas?.map((manga) => (
                    // eslint-disable-next-line react/jsx-key
                    <Link href={`/${manga.type}/${manga.mal_id}`}>
                        <div key={manga.mal_id} className={styles.response_container}>
                                <Image src={manga.images.jpg.image_url} height={120} width={80} alt='manga'/>
                                <ul className={styles.response_list}>
                                    <li><strong>{manga.title}</strong></li>
                                    <li><Link href={manga.url} target='_blank'><SiMyanimelist /></Link></li> 
                                    <li><strong>Autor: </strong>{manga.authors[0]?.name}</li>
                                    <li><strong>tags: </strong>
                                    {manga.genres.map(genre => (
                                        // eslint-disable-next-line react/jsx-key
                                        <span key={genre.mal_id}> {genre.name} </span>
                                    ))}
                                    </li>
                                </ul>
                        </div>
                    </Link>
                    ))
                )}
                </div>
            </div>
            <div className={styles.user}>
                <h2>Alex</h2>
            </div>
        </header>
    )
}