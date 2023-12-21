import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import { api } from "@/services/api";


interface ReaderManagerContextProps {
    imagesSource: string[]
    readerType: 'vertical' | 'paginação'
    toggleReaderType: () => void
}

const ReaderManagerContext = createContext<ReaderManagerContextProps>({} as ReaderManagerContextProps)

export function ReaderManagerProvider({ children }: { children: React.ReactNode }) {
    const [imagesSource, setImagesSource] = useState<string[]>([])
    const [readerType, setReaderType] = useState<'vertical' | 'paginação'>("vertical")
    const params = useParams<{manga_id: string; chapter_id: string}>()
    
    async function getMangaInfos() {
        try {
            let res = await api.get(`/manga/${params.manga_id}`)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    function toggleReaderType() {
        if (readerType === 'vertical') {
            setReaderType('paginação')
        } else {
            setReaderType('vertical')
        }
    }

    useEffect(() => {
        getMangaInfos()
    }, [])

    return (
        <ReaderManagerContext.Provider value={{
            imagesSource,
            readerType,
            toggleReaderType
        }}>
            {children}
        </ReaderManagerContext.Provider>
    )
}

export const useReaderManager = () => useContext(ReaderManagerContext)