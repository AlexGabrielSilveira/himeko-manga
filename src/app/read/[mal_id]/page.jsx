import Image from 'next/image'
import styles from './read.module.css'

export default function readPage() {

    return (
        <main className={styles.container}>
            <div className={styles.pagination}>
                <div>
                    <p className={styles.back_arrow}>◀</p>
                    <span>capitulos</span>
                    <p className={styles.front_arrow}>▶</p>
                </div>
            </div>  
            <div className={styles.read_container}>
                <Image src="/test_read_page.webp" height={800} width={600} alt='read' />
            </div>
        </main>
    )
}