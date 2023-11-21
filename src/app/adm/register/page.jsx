"use client"

import styles from './register.module.css'
import { useState } from "react"
import Image from 'next/image'
import { api } from '../../../services/api'
import Modal from '@/components/modals/search/Modal'

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
            note: manga.score.toString(),
            img: manga.images.jpg.image_url,
            name: manga.title,
            mal_id: manga.mal_id
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
        let res = await api.post("/admin/manga", mangaInfos)
        console.log(res.data)
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
                            <>
                                <Modal manga={manga} admin={true} />
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
                <p>capa: </p><Image src={mangaInfos.img} height={120} width={80} alt='manga'/>
                <p>descrição: </p>
                <textarea onChange={getDescription}></textarea>
            </div>
            <button type="submit">Cadastrar</button>
        </form>
    </main>
    )
}