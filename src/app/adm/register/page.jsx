"use client"

import styles from './register.module.css'
import { useState } from "react"
import { AiFillStar } from 'react-icons/ai'
import Image from 'next/image'
import axios from 'axios'

export default function AdmRegister() {
    const[loading, setLoading] = useState(false)
    const[mangaInfos, setMangaInfos] = useState({ tags: '', note: '', img: '', name: '', description: ''})
    const[mangas, setMangas] = useState()
    const[value, setValue] = useState('')
    const[close, setClose] = useState(false)

    function getValue(e) {
        setValue(e.target.value.toLowerCase())
    }
    async function searchManga(e) {
        e.preventDefault()
        let res = await fetch(`https://api.jikan.moe/v4/manga?q=${value}&sfw`)
        let r = await res.json()

        setMangas(r.data.slice(0,10))
        setLoading(true)
    }
    function saveMangaInfos(manga) { 
        setMangaInfos({
            tags: manga.genres.map((genre) => genre.name).join(','),
            note: manga.score,
            img: manga.images.jpg.image_url,
            name: manga.title
        })
    }
    function handleClose() {
        setInterval(() => {
            setClose(!close)
        }, 200);
    }
    function getDescription(e) {
        setMangaInfos({...mangaInfos,  description: e.target.value})
    }
    async function handleSubmit(e) {
        e.preventDefault()
        let res = await fetch("http://localhost:8080/admin/manga", {
            method: 'POST',
            body: JSON.stringify({mangaInfos})
        })
        let r = await res.json()
        console.log(r)
    }

    return (
    <main>
        <form method="post" onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.search}>
                <input type="text" placeholder="Nome do manga." onChange={getValue}/>
                <button onClick={searchManga}>buscar</button>
            </div>
            {loading == false ? '' : (
                <div className={styles.container}>
                    {close == false ? (
                        <>
                        {mangas.map(manga => (
                            <div key={manga.mal_id} className={styles.response}>
                            <Image src={manga.images.jpg.image_url} height={120} width={80} alt='manga'/>
                                <ul className={styles.response_list}>
                                    <li><strong>{manga.title}</strong></li>
                                    <li><strong>Autor: </strong>{manga.authors[0]?.name}</li>
                                    <li><strong>Tipo: </strong> {manga.type}</li>
                                    <li><strong>tags: </strong>
                                    {manga.genres.map(genre => (
                                        <span key={genre.mal_id}> {genre.name} </span>
                                        ))}
                                    </li>
                                    <li><strong>score<AiFillStar />: </strong>{manga.score}</li>
                                    <li>
                                        <button onClick={() => saveMangaInfos(manga)} onMouseUp={handleClose} type='button'>ADICIONAR</button>
                                    </li>
                                </ul>
                            </div>
                        ))}
                        </>
                    ): ''}
                </div>
            )}
            <div>
                <p>nome: {mangaInfos.name}</p>
                <p>nota: {mangaInfos.note} </p>
                <p>tags: {mangaInfos.tags}</p>
                <p>capa: </p><Image src={mangaInfos.img} height={120} width={80} alt='manga'/>
                <p>descrição: </p>
                <textarea onChange={getDescription}></textarea>
            </div>
            <button type="submit">Cadastrar</button>
        </form>
    </main>
    )
}