/* eslint-disable react/jsx-key */
"use client";
import { useEffect, useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { SiMyanimelist } from 'react-icons/si'
export default function Home() {
  const[mangaRecommendations, setMangaRecommendations] = useState([])
  const[loading, setLoading] = useState(false)

  function getMangaRecommendations() {
    fetch(`https://api.jikan.moe/v4/manga/11/recommendations`)
    .then(res => res.json())
    .then(res => {
      setMangaRecommendations(res.data.slice(0,10))
      console.log(res.data.slice(0,10))
      setLoading(true)
    })
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
              <h4>teste</h4>
            </div>
          </div>
          <div className={styles.manga_recommendations}>
            <h3>recomendações</h3>
            <div className={styles.mangas_by_recommendations}>
              {mangaRecommendations.map(manga => (
                <div key={manga.url}>
                  <Image src={manga.entry.images.jpg.image_url} height={120} width={80} alt=''/>
                  <ul>
                    <li>{manga.entry.title}</li>
                    <li><Link href={manga.entry.url} target='_blank'>< SiMyanimelist /></Link></li>
                    <li><Link href={manga.entry.url} target='_blank'><strong>Leia Agora !</strong></Link></li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  )
}
