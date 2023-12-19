/* eslint-disable @next/next/no-img-element */
import { useReaderManager } from "@/contexts/ReaderManager";
import Link from "next/link";
import React from "react";

export function VerticalReader() {
    const { imagesSource } = useReaderManager()

    return (
        <div>
            <Link href="#">⬆</Link>
            {imagesSource.map((source, index) => (
                <img src={source} key={index} alt='capitulo' />
            ))}
        </div>
    )
}