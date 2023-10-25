import styles from './perfil.module.css'
import { SiMyanimelist } from 'react-icons/si'
import Image from 'next/image'
import Link from 'next/link'


export default function Perfil() {

    
return (
    <main className={styles.main_container}>
        <div className={styles.user_infos}>
            <h1>Nome: alex</h1>
            <h2>Email: alexgabriel1217@gmail.com</h2>
        </div>
        <hr />
        <div className={styles.favs}>
            <h1>Mangás Favoritos 🔽</h1>
            <div className={styles.favs_mangas}>
                <div className={styles.favs}>
                    <Image src="/test_read_page.webp"height={120} width={80} alt=''/>
                    <ul>
                        <li>One piece</li>
                        <li><Link href="#">< SiMyanimelist /></Link></li>
                        <li><Link href="#"><strong>Leia Agora !</strong></Link></li>
                        <li className={styles.remove}>remover</li>
                    </ul>
                </div>
                <div className={styles.favs}>
                    <Image src="/test_read_page.webp"height={120} width={80} alt=''/>
                    <ul>
                        <li>One piece</li>
                        <li><Link href="#">< SiMyanimelist /></Link></li>
                        <li><Link href="#"><strong>Leia Agora !</strong></Link></li>
                        <li className={styles.remove}>remover</li>
                    </ul>
                </div>
                <div className={styles.favs}>
                    <Image src="/test_read_page.webp"height={120} width={80} alt=''/>
                    <ul>
                        <li>One piece</li>
                        <li><Link href="#">< SiMyanimelist /></Link></li>
                        <li><Link href="#"><strong>Leia Agora !</strong></Link></li>
                        <li className={styles.remove}>remover</li>
                    </ul>
                </div>
                <div className={styles.favs}>
                    <Image src="/test_read_page.webp"height={120} width={80} alt=''/>
                    <ul>
                        <li>One piece</li>
                        <li><Link href="#">< SiMyanimelist /></Link></li>
                        <li><Link href="#"><strong>Leia Agora !</strong></Link></li>
                        <li className={styles.remove}>remover</li>
                    </ul>
                </div>
            </div>
        </div>
    </main>
)
}