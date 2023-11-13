import { useState } from 'react'
import styles from './infos.module.css'
import Link from 'next/link'
import Login from '../login/Login'

export default function Infos() {
    const[login, setLogin] = useState(false)
    const[signIn, setSignIn] = useState(false)

    function handleClick() {
        setSignIn(true)
    }
    return (
        <main>
            <div className={styles.list}>
            {login == true ? (
            <>
                <li>Administração</li>
                <li>-------------------</li>
                <li>Perfil</li>
                <li>Mángas</li>
                <li>scanlators</li>
                <li>Categorias</li>
            </>
            ): (
            <>
                <li><span onClick={handleClick} className={styles.login}>Entre</span> ou <Link href="/register">registre-se!</Link></li>
                <li>-------------------</li>
                <li>Mángas</li>
                <li>scanlators</li>
                <li>Categorias</li>
            </>
            )}
            </div>
            <div>
                {signIn == true ? ( 
                    <Login />
                ): ""}
            </div>
        </main>
    )
}