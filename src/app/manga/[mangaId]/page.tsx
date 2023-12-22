"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './mangaPage.module.css'
import Link from 'next/link';
import Image from "next/image";
import { AiFillStar } from 'react-icons/ai'
import { api } from "@/services/api";
import { Manga } from "@/components/header/Navbar";

interface Chapters {
    id: number,
    chapterNumber: number,
    mangaId: number,
    created_at: string
}   

export default function MangaPage() {
    const[mangaInfos, setMangaInfos] = useState<Manga>()
    const[chapters, setChapters] = useState<Chapters[]>([])
    const[loading, setLoading] = useState(true)
    const params = useParams()
    const mangaId = params.mangaId

    async function getMangaInfos() {
        try {
            let res = await api.get(`/manga/${mangaId}`)
        
            setMangaInfos(res.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    async function getChapters() {
        let res = await api.get(`/manga/${mangaId}/chapters`)

        setChapters(res.data)
    }

    useEffect(() => {
        getMangaInfos()
        getChapters()
    }, [])

    chapters.map(chapter => console.log(chapter))
    return ( 
        <>
        {loading == true ? (<h1>carregando ...</h1>) : (
        <div className={styles.container}>
            <div className={styles.container_flex}>
                <div className={styles.manga_image}>
                    <Image src={mangaInfos?.cape_url} width="1280" height="720" alt={mangaInfos?.name}/>
                </div>
                <div className={styles.manga_infos}>
                    <ul> 
                        <li><strong>{mangaInfos?.name}</strong></li>
                        <li><strong>Autor: </strong>{mangaInfos?.authors}</li>
                        <li><strong>tags: </strong>{mangaInfos?.tags}</li>
                        <li className={styles.score}><strong>score <AiFillStar />: {mangaInfos?.note}</strong></li>
                    </ul>
                    <ul>
                        <li><strong>Sinopse</strong></li>
                        <li className={styles.sinopsys}>{mangaInfos?.description}</li> 
                    </ul>
                </div>
            </div>
            <div className={styles.caps_container}>
                <h1>Capitulos</h1>
                <div className={styles.caps}>
                    {chapters.length == 0 ? (<h1>sem nada</h1>) : chapters.map((chapter) => (
                        <Link key={chapter.id} href={`/read/manga/${mangaInfos?.id}/chapter/${chapter.id}`}><p><span>10/10/2023 | Capitulo {chapter.chapterNumber} </span> <span>Opex Scanlator</span></p></Link>
                    ))}
                </div>
            </div> 
        </div>
        )}
        </>
    )
}
