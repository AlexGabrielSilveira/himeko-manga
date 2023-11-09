"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from './scanlator.module.css'

export default function Scanlator() {
    const[scans, setScans] = useState()
    const[loading, setLoading] = useState(true)

    async function getScans() {
    let res =  await fetch("http://localhost:8080/")
    let data = await res.json()

        setScans(data)
        setLoading(false)
    }
    useEffect(() => {
        getScans()
    })
    return (
        <div className={styles.scanlators}>
            <h3>Scanlators</h3>
            {loading == true ? (<h1>carregando...</h1>) : (
                <div className={styles.scanlators_carrousel}>
                    {scans.map(scan => (
                        <div key={scan.name} className={styles.scanlator}>
                            <Image src={scan.logo} width={100} height={80} alt="scan logo"/>
                            <Link target="_blank" href={scan.url}><h3>{scan.name}</h3></Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    ) 
}