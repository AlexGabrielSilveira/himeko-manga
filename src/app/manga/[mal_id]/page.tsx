"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './mangaPage.module.css'
import Link from 'next/link';
import { SiMyanimelist } from 'react-icons/si'
import Image from "next/image";
import { AiFillStar } from 'react-icons/ai'
import { Manga } from '@/components/header/Navbar'

export default function MangaPage() {
    const[mangaInfos, setMangaInfos] = useState<Manga[]>([])
    const[loading, setLoading] = useState(true)
    const params = useParams()
    const mal_id = params.mal_id

    function getMangaInfos() {
        fetch(`https://api.jikan.moe/v4/manga/${mal_id}`).then(res => res.json())
        .then(res => {
            setMangaInfos(res.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        getMangaInfos()
    }, [])
    return ( 
        <>
        {loading == true ? (<h1>carregando ...</h1>) : (
        <div className={styles.container}>
            <div className={styles.container_flex}>
                <div className={styles.manga_image}>
                    <Image src={mangaInfos?.images?.jpg?.large_image_url} width="1280" height="720" alt={mangaInfos.title}/>
                </div>
                <div className={styles.manga_infos}>
                    <ul> 
                        <li><strong>{mangaInfos.title}</strong></li>
                        <li><strong>Autor: </strong>{mangaInfos.authors[0].name}</li> 
                        <li><strong>tags: </strong>
                        {mangaInfos.genres.map(genre => (
                            <span key={genre.mal_id}> {genre.name} </span>
                        ))}
                        </li>
                        <li className={styles.score}><strong>score <AiFillStar />: {mangaInfos.score}</strong></li>
                        <li className={styles.mal}><Link href={`${mangaInfos.url}`} target='_blank'><SiMyanimelist /></Link></li> 
                    </ul>
                    <ul>
                        <li><strong>Sinopse</strong></li>
                        <li className={styles.sinopsys}>{mangaInfos.synopsis}</li> 
                    </ul>
                </div>
            </div>
            <div className={styles.caps_container}>
                <h1>Capitulos</h1>
                <div className={styles.caps}>
                    <Link href={`/read/${mangaInfos.mal_id}`}><p><span>10/10/2023 | Capitulo 01</span> <span>Opex Scanlator</span></p></Link>
                </div>
                <div className={styles.caps}>
                    <Link href={`/read/${mangaInfos.mal_id}`}><p><span>10/10/2023 | Capitulo 01</span> <span>Opex Scanlator</span></p></Link>
                </div>
                <div className={styles.caps}>
                    <Link href={`/read/${mangaInfos.mal_id}`}><p><span>10/10/2023 | Capitulo 01</span> <span>Opex Scanlator</span></p></Link>
                </div>
            </div>
        </div>
        )}
        </>
    )
}