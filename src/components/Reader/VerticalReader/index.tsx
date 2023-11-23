import { useReaderManager } from "@/contexts/ReaderManager";
import React from "react";

export function VerticalReader() {
    const { imagesSource } = useReaderManager()

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '16px' }}>
            {imagesSource.map((source, index) => (
                <img src={source} key={index} alt='sads' />
            ))}
        </div>
    )
}