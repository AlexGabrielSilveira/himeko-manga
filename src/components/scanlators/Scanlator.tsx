"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from './scanlator.module.css'
import { api } from "@/services/api"

interface Scanlator {
    name: string,
    logo: string,
    url: string
}

export default function Scanlator() {
    const[scans, setScans] = useState<Scanlator[]>([])
    const[loading, setLoading] = useState(true)

    function getScans() {
        api.get("/scanlator")
            .then(res => {
                setScans(res.data)
                setLoading(false)
            })
    }
    useEffect(() => {
        getScans()
    }, [])
    return (
        <div className={styles.scanlators}>
            <h3>Scanlators</h3>
            {loading == true ? (<h1>carregando...</h1>) : (
                <div className={styles.scanlators_carrousel}>
                    {scans.map(scan => (
                        <div key={scan.name} className={styles.scanlator}>
                            <Image src={scan.logo} width={80} height={80} alt="scan logo"/>
                            <Link target="_blank" href={scan.url}><h3>{scan.name}</h3></Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    ) 
}