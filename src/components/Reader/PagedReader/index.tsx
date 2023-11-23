'use client'
import { useReaderManager } from "@/contexts/ReaderManager";
import { useCallback, useEffect, useMemo, useState } from "react"

export function PagedReader() {
    const { imagesSource } = useReaderManager()
    const [currentPage, setCurrentPage] = useState(0)
    const lastPage = useMemo(() => imagesSource.length - 1, [imagesSource])
    const currentImageSource = imagesSource[currentPage]
    const nextPageKeys = useMemo(() => ['ArrowRight', 'd'], [])
    const previousPageKeys = useMemo(() => ['ArrowLeft', 'a'], [])

    function onImageClick(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
        const image = e.currentTarget;
        const clickX = e.clientX;
        const imageLeft = image.offsetLeft;
        const imageWidth = image.offsetWidth;

        const clickedOnLeftSide = clickX < imageLeft + imageWidth / 2;

        if (clickedOnLeftSide) {
            previousPage()
        } else {
            nextPage()
        }
    }

    const nextPage = useCallback(() => {
        if (currentPage === lastPage) return

        setCurrentPage(prev => prev + 1)
    }, [currentPage, lastPage])


    const previousPage = useCallback(() => {
        if (currentPage === 0) return

        setCurrentPage(prev => prev - 1)
    }, [currentPage])

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (nextPageKeys.includes(e.key)) {
                nextPage()
            }

            if (previousPageKeys.includes(e.key)) {
                previousPage()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [nextPageKeys, nextPage, previousPageKeys, previousPage, currentPage])

    return (
        <div>
            <h1>{currentPage + 1} / {lastPage + 1}</h1>
            {/* eslint-disable-next-line */}
            <img onClick={onImageClick} src={currentImageSource} />
            <h1>{currentPage + 1} / {lastPage + 1}</h1>
        </div>
    )
}