"use client"
import { Manga } from "@/components/header/Navbar";
import { api } from "@/services/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from './upload.module.css'
import Input from "@/components/inputs/Input";
import { pages } from "next/dist/build/templates/app-page";

interface Chapter {
    chapterNumber: string,
    scanlator: string ,
    pagesSrc: File[]
}
interface MangasInfos {
    id: number,
    cape_url: string
}

export default function AdmUpdateChapter() {
    const[mangas, setMangas] = useState<Manga[]>([])
    const[mangaInfos, setMangaInfos] = useState<MangasInfos>()
    const[chapter, setChapter] = useState<Chapter>({
        chapterNumber: "",
        scanlator: "",
        pagesSrc: []
    })

    async function getMangas() {
        try {
            let res = await api.get("/manga")
            setMangas(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedManga = mangas.find(manga => manga.name === event.target.value);
        if (selectedManga) {
            setMangaInfos(selectedManga)
        }
    }
    function handleSubmit(e: any) {
        e.preventDefault()

        const formData = new FormData()
        formData.append('scanlator', chapter.scanlator)
        chapter.pagesSrc.forEach((page) => {
            formData.append('pagesSrc', page)
        })
        
        api.post(`/admin/manga/${mangaInfos?.id}/chapter/${chapter.chapterNumber}`, formData)

    }
    useEffect(() => {
        getMangas()
    },[])

    function handleChapterNumber(e: React.ChangeEvent<HTMLInputElement>) {
        setChapter({...chapter, chapterNumber: e.target.value})
    }
    function handleScanlator(e: React.ChangeEvent<HTMLInputElement>) {
        setChapter({...chapter, scanlator: e.target.value})
    }
    function handlePages(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.files === null) return
        const pagesSources = []
        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i]
            pagesSources.push(file)
        }
        setChapter({...chapter, pagesSrc: pagesSources})
    }

    return (
        <main className={styles.container}>
            <div className={styles.select_manga}>
                <select onChange={handleSelectChange}>
                    <option value="" disabled selected>Selecione um manga</option>
                    {mangas.map(manga => (
                        <option key={manga.id} value={manga.name}>{manga.name}</option>
                    ))}
                </select>
            </div>  
            <form method="post" onSubmit={handleSubmit}>
                <Image src={mangaInfos == undefined ? '/duck.gif' : mangaInfos.cape_url} width="180" height="250" alt="capa"/>
                <div>
                    <Input type="number" placeholder="Número do cápitulo: " onChange={handleChapterNumber}/>
                    <Input type="text" placeholder="Scanlator: " onChange={handleScanlator} />
                    <input type="file" multiple onChange={handlePages}/>
                    <button type="submit" className={styles.submit_button}>Cadastrar Capitulo</button>
                </div>
            </form>
        </main>
    )
}