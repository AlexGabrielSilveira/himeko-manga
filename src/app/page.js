"use client";

import { useEffect, useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { SiMyanimelist } from 'react-icons/si'
import Scanlator from '@/components/scanlators/Scanlator';
import Manga from '@/components/newMangas/News';


export default function Home() {
  const[mangaRecommendations, setMangaRecommendations] = useState([])
  const[loading, setLoading] = useState(false)

  async function getMangaRecommendations() {
    let res = await fetch(`https://api.jikan.moe/v4/manga/11/recommendations`)
    let data = await res.json()


    setMangaRecommendations(data.data.slice(0,20))
    setLoading(true)
  }
  useEffect(() => {
    getMangaRecommendations() 
  }, [])
  return (
    <main className={styles.flex_main}>
      {loading == false ? (<h1>carregando ...</h1>) : (
        <>
          <div className={styles.manga_news}>
            <h3>Lançamentos</h3> 
            <div className={styles.mangas_news}>
              <Manga />
            </div>
          </div>
          <Scanlator />
        </>
      )}
    </main>
  )
}