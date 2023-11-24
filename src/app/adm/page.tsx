import Link from "next/link"
import styles from './page.module.css'

export default function Page() {
    return (
        <main className={styles.container}>
            <ul>
                <li><Link href="/adm/register">Registrar Manga</Link></li>
                <li><Link href="/adm/scanlator">Registrar Scanlator</Link></li>
                <li><Link href="/adm/upload">Upload de capitulos</Link></li>
            </ul>
        </main>
    )
}