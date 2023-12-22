import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import { api } from "@/services/api";


interface ReaderManagerContextProps {
    imagesSource: string[]
    readerType: 'vertical' | 'paginação'
    toggleReaderType: () => void,
    setImagesSource: (src: string[]) => void
}

const ReaderManagerContext = createContext<ReaderManagerContextProps>({} as ReaderManagerContextProps)

export function ReaderManagerProvider({ children }: { children: React.ReactNode }) {
    const [imagesSource, setImagesSource] = useState<string[]>([])
    const [readerType, setReaderType] = useState<'vertical' | 'paginação'>("vertical")
    console.log(imagesSource)
    function toggleReaderType() {
        if (readerType === 'vertical') {
            setReaderType('paginação')
        } else {
            setReaderType('vertical')
        }
    }

    return (
        <ReaderManagerContext.Provider value={{
            imagesSource,
            readerType,
            toggleReaderType,
            setImagesSource
        }}>
            {children}
        </ReaderManagerContext.Provider>
    )
}

export const useReaderManager = () => useContext(ReaderManagerContext)
