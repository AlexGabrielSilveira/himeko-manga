import React, { createContext, useContext, useEffect, useState } from "react";

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
