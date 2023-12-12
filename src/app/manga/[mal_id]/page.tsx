"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './mangaPage.module.css'
import Link from 'next/link';
import { SiMyanimelist } from 'react-icons/si'
import Image from "next/image";
import { AiFillStar } from 'react-icons/ai'
import { Manga } from '@/components/header/Navbar'
import { api } from "@/services/api";

export default function MangaPage() {
    const[mangaInfos, setMangaInfos] = useState([])
    const[loading, setLoading] = useState(true)
    const params = useParams()
    const mal_id = params.mal_id

    async function getMangaInfos() {
        try {
            let res = await api.get(`/manga/${mal_id}`)
        
            setMangaInfos(res.data)
            setLoading(false)
            
        } catch (error) {
            console.log(error)
        }
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
                    <Image src={mangaInfos.cape_url} width="1280" height="720" alt={mangaInfos.name}/>
                </div>
                <div className={styles.manga_infos}>
                    <ul> 
                        <li><strong>{mangaInfos.name}</strong></li>
                        <li><strong>Autor: </strong>{manga.authors}</li>
                        <li><strong>tags: </strong>{mangaInfos.tags}</li>
                        <li className={styles.score}><strong>score <AiFillStar />: {mangaInfos.note}</strong></li>
                    </ul>
                    <ul>
                        <li><strong>Sinopse</strong></li>
                        <li className={styles.sinopsys}>{mangaInfos.description}</li> 
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