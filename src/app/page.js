"use client";

import styles from './page.module.css'
import Scanlator from '@/components/scanlators/Scanlator';
import Manga from '@/components/newMangas/News';


export default function Home() {
  return (
    <main className={styles.flex_main}>
          <div className={styles.manga_news}>
            <h3>Lançamentos</h3> 
            <div className={styles.mangas_news}>
              <Manga />
            </div>
          </div>
          <Scanlator />
    </main>
  )
}