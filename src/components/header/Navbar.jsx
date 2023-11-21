"use client";

import styles from './navbar.module.css'
import { useState } from 'react';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi'
import Infos from './infos/infos';
import Modal from '../modals/search/Modal';

export default function Navbar() {
    const[mangas, setMangas] = useState([])
    const[searchValue, setSearchValue] = useState([])
    const[close, setClose] = useState(false)
    const[visibility, setVisibility] = useState(true)

    function handleChange(e) {
        setSearchValue(e.target.value.toLowerCase())
    }
    async function handleClick() {
        if(searchValue.length > 3) {
            let res = await fetch(`https://api.jikan.moe/v4/manga?q=${searchValue}&sfw`)
            let r = await res.json()

            setMangas(r.data)
        }
    }
    function handleVibility() {
        setVisibility(!visibility)
    }

    return (
        <header className={styles.header}>
            <Link href="/">
                <div className={styles.logo}>
                    <h1>Himeko</h1>
                </div>
            </Link>
            <div className={styles.search}>
                <input type='text' placeholder='Ex: One piece' onChange={handleChange}/>
                <button type='submit' onClick={handleClick}>search</button>
            </div>
                {close == false ? (
                    <div className={styles.container}>
                    {mangas.map((manga) => (
                        <Modal manga={manga} state={close} add={false}/>
                    ))}
                </div>
                ) : ""}
            <div className={styles.login}>
                <h2 onClick={handleVibility}><GiHamburgerMenu /></h2>
                {visibility == false  ? (
                    <Infos />
                ): ""} 
            </div>
        </header>
    )
}
