"use client"

import styles from './perfil.module.css'
import { SiMyanimelist } from 'react-icons/si'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'


export default function Perfil() {
    const { user } = useContext(AuthContext)

    return (
        <main className={styles.main_container}>
            <div className={styles.user_and_favs}>
                <div className={styles.user_infos}>
                    <Image src={user?.picture as string} width={60} height={60} alt='user picture'/>
                    <Link href="/adm/scanlator">Criar uma scanlator</Link>
                </div>
                <hr />
                <div className={styles.favs}>
                    <h2>Favoritos</h2>
                    <div className={styles.card_container}>
                        {/* <div className={styles.card}>
                            <Image src="/test_read_page.webp"height={120} width={80} alt=''/>
                            <ul>
                                <li>One piece</li>
                                <li className={styles.remove}>remover</li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
            {user?.role === 'scanlator' ? (
                <div className={styles.scanlator}>
                    <p>imagem da scanlator</p>
                    <p>nome</p>
                    <p>os mangas ja traduzidos por ela </p>
                </div>
            ) : ''}
        </main>
    )
}