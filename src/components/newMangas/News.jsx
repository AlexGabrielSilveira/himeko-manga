"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiMyanimelist } from 'react-icons/si'
import styles from './new.module.css'
import { api } from "@/services/api";

export default function Manga() {
    const[mangas, setMangas] = useState([])
    const[loading, setLoading] = useState(true)

    function getMangas() {
        api.get("/manga")
            .then(res => {
                setMangas(res.data)
                setLoading(false)
            })
        }
        useEffect(() => {
            getMangas()
        },[])
    return (
        <div className={styles.mangas}>
            {loading == true ? (<h1>carregando...</h1>) : (
                <div className={styles.mangas_carrousel}>
                    {mangas.map(manga => (
                        <div key={manga.name} className={styles.manga}>
                            <Image src={manga.cape_url} height={120} width={80} alt="capa do manga"/>
                            <ul>
                                <li> <Link href={`/manga/${manga.mal_id}`}><h3>{manga.name}</h3></Link></li>
                                <li><Link href={`https://myanimelist.net/manga/${manga.mal_id}`} target='_blank'>< SiMyanimelist /></Link></li>
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    ) 
}