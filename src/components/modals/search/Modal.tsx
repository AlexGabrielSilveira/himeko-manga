import Image from 'next/image'
import { AiFillStar } from 'react-icons/ai'
import Link from 'next/link'
import styles from './modal.module.css'
import { Manga } from '@/components/header/Navbar'


interface ModalProps {
    manga: Manga,
    state: boolean,
    admin: boolean
}

export default function Modal({ manga, state, admin}: ModalProps) {
    function handleClose() {
        setClose(state)
    }
    return (
        <>
        {admin === true ? (
            <div key={manga.mal_id} className={styles.admin_response}>
            <Image src={manga.images.jpg.image_url} height={120} width={80} alt='manga'/>
                <ul className={styles.admin_response_list}>
                    <li><strong>{manga.title}</strong></li>
                    <li><strong>Autor: </strong>{manga.authors[0]?.name}</li>
                    <li><strong>Tipo: </strong> {manga.type}</li>
                    <li><strong>tags: </strong>
                    {manga.genres.map(genre => (
                        <span key={genre.mal_id}> {genre.name} </span>
                        ))}
                    </li>
                    <li><strong>score<AiFillStar />: </strong>{manga.score}</li>
                    
                </ul>
            </div>
            ) : (
            <Link href={`${manga.type.toLowerCase()}/${manga.mal_id}`} onClick={handleClose}>
            <div key={manga.mal_id} className={styles.response_container}>
            <Image src={manga.images.jpg.image_url} height={120} width={80} alt='manga'/>
                <ul className={styles.response_list}>
                    <li><strong>{manga.title}</strong></li>
                    <li><strong>Autor: </strong>{manga.authors[0]?.name}</li>
                    <li><strong>tags: </strong>
                    {manga.genres.map(genre => (
                        <span key={genre.mal_id}> {genre.name} </span>
                        ))}
                    </li>
                    <li><strong>score<AiFillStar />: </strong>{manga.score}</li>
                </ul>
            </div>
        </Link>
        )}
        </>
    )
}