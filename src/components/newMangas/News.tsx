"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from './new.module.css'
import { api } from "@/services/api";
import { Manga } from '@/components/header/Navbar'

export default function Manga() {

    const[mangas, setMangas] = useState<Manga[]>([])
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
                <>
                    {mangas.map(manga => (
                        <div key={manga.name} className={styles.manga}>
                            <Image src={manga.cape_url} width={1280} height={720}  alt="capa do manga"/>
                            <ul>
                                <li> <Link href={`/manga/${manga.mal_id}`}><h3>{manga.name}</h3></Link></li>
                                <li>CAPÍTULO 222</li>
                            </ul>
                        </div>
                    ))}
                </>
            )}
        </div>
    ) 
}