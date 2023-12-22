import { useReaderManager } from "@/contexts/ReaderManager"
import { PagedReader } from "./PagedReader"
import { VerticalReader } from "./VerticalReader"
import styles from './reader.module.css'
import { useParams } from "next/navigation"
import { api } from "@/services/api"
import { useEffect } from "react"

export function Reader(): JSX.Element {
    const { readerType, toggleReaderType, setImagesSource } = useReaderManager()

    const params = useParams<{manga_id: string; chapter_id: string}>()
    
    async function getMangaInfos() {
        try {
            let res = await api.get(`/manga/${params.manga_id}/chapters/${params.chapter_id}`)
            setImagesSource(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getMangaInfos()
    }, [])

    return (
        <div className={styles.container}>
            <button onClick={toggleReaderType}><span>Leitura:</span> <h3>{readerType }</h3></button>
            {readerType === 'paginação' ? <PagedReader /> : <VerticalReader />}
        </div>
    )
}