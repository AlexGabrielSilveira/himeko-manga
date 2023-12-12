"use client"

import styles from './register.module.css'
import { useState } from "react"
import Image from 'next/image'
import { api } from '../../../services/api'
import { Manga } from '@/components/header/Navbar'
import { AiFillStar } from 'react-icons/ai'
import Input from '@/components/inputs/Input'


export default function AdmRegister() {
    const[loading, setLoading] = useState(false)
    const[mangaInfos, setMangaInfos] = useState<Manga>({ tags: '', note: '', img: '', name: '', description: '', mal_id: 0})
    const[mangas, setMangas] = useState<Manga[]>([])
    const[value, setValue] = useState('')
    const[close, setClose] = useState(false)

    async function searchManga(e: React.ChangeEvent <HTMLInputElement>) {
        setValue(e.target.value.toLowerCase())
        if(value.length > 3 ) {
            e.preventDefault()
            let res = await fetch(`https://api.jikan.moe/v4/manga?q=${value}&sfw`)
            let r = await res.json()

            setMangas(r.data.slice(0,10))
            setLoading(true)
        }
    }

    function saveMangaInfos(manga: Manga[]) { 
        setMangaInfos({
            tags: manga.genres.map((genre) => genre.name).join(','),
            note: manga.score.toString(),
            authors: manga.authors.map((author) => author.name).join(','),
            img: manga.images.jpg.image_url,
            name: manga.title,
            mal_id: manga.mal_id
        })
    }
    function handleClose() {
        setInterval(() => {
            setClose(!close)
        }, 100);
    }
    function getDescription(e: React.ChangeEvent <HTMLTextAreaElement>) {
        setMangaInfos({...mangaInfos,  description: e.target.value})
    }
    async function handleSubmit(e: any) {
        e.preventDefault()
    }

    return (
    <main>
        <form method="post" onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.search}>
                <Input type={"text"} placeholder={"Nome do manga."} onChange={searchManga} />
            </div>
            {loading == false ? '' : (
                <div className={styles.container}>
                    {close == false ? (
                        <>
                        {mangas.map(manga => (
                        <>
                        <div key={manga.mal_id} className={styles.admin_response}>
                            <Image src={manga.images.jpg.image_url} height={120} width={80} alt='manga'/>
                                <ul className={styles.admin_response_list}>
                                    <li><strong>{manga.title}</strong></li>
                                    <li><strong>Autor: </strong>{manga.authors[0]?.name}</li>
                                    <li><strong>Tipo: </strong> {manga.type}</li>
                                    <li><strong>tags: </strong>
                                    {manga.genres.map(genre => (
                                        <span key={genre.mal_id}> {genre.name} </span>
                                        ))}
                                    </li>
                                    <li><strong>tags: </strong>
                                    {manga.authors.map(author => (
                                        <span key={author.mal_id}> {author.name} </span>
                                        ))}
                                    </li>
                                    <li><strong>score<AiFillStar />: </strong>{manga.score}</li>
                                    
                                </ul>
                            </div>
                        <button className={styles.admin_button} onClick={() => saveMangaInfos(manga)} onMouseUp={handleClose} type='button'>ADICIONAR</button>
                        </>
                        ))}
                    </>
                    ): ''}
                    
                </div>
            )}
            <div>
                <p>nome: {mangaInfos.name}</p>
                <p>mal_id: {mangaInfos.mal_id}</p>
                <p>nota: {mangaInfos.note} </p>
                <p>tags: {mangaInfos.tags}</p>
                <p>autor: {mangaInfos.authors}</p>
                <p>capa: </p><Image src={mangaInfos.img} height={120} width={80} alt='manga'/>
                <p>descrição: </p>
                <textarea onChange={getDescription}></textarea>
            </div>
            <button type="submit">Cadastrar</button>
        </form>
    </main>
    )
}