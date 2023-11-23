import React, { createContext, useContext, useState } from "react";


interface ReaderManagerContextProps {
    imagesSource: string[]
    readerType: 'vertical' | 'paged'
    toggleReaderType: () => void
}

const ReaderManagerContext = createContext<ReaderManagerContextProps>({} as ReaderManagerContextProps)

export function ReaderManagerProvider({ children }: { children: React.ReactNode }) {
    const [imagesSource, setImagesSource] = useState<string[]>([
        'http://localhost:3000/よつばと!/Yotsubato_v06_000-1.jpg',
        'http://localhost:3000/よつばと!/Yotsubato_v06_000-2.jpg',
        'http://localhost:3000/よつばと!/Yotsubato_v06_000-3.jpg',
        'http://localhost:3000/よつばと!/Yotsubato_v06_000-4.jpg',
        'http://localhost:3000/よつばと!/Yotsubato_v06_001.jpg',
        'http://localhost:3000/よつばと!/Yotsubato_v06_002.jpg',
        "http://localhost:3000/よつばと!/Yotsubato_v06_001.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_002.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_003.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_004.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_005.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_006.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_007.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_008.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_009.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_010.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_011.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_012.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_013.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_014.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_015.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_016.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_017.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_018.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_019.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_020.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_021.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_022.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_023.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_024.jpg",
        "http://localhost:3000/よつばと!/Yotsubato_v06_025.jpg",
    ])
    const [readerType, setReaderType] = useState<'vertical' | 'paged'>("vertical")

    function toggleReaderType() {
        if (readerType === 'vertical') {
            setReaderType('paged')
        } else {
            setReaderType('vertical')
        }
    }

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