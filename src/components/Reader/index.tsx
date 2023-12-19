import { useReaderManager } from "@/contexts/ReaderManager"
import { PagedReader } from "./PagedReader"
import { VerticalReader } from "./VerticalReader"
import styles from './reader.module.css'

export function Reader(): JSX.Element {
    const { readerType, toggleReaderType } = useReaderManager()

    return (
        <div className={styles.container}>
            <button onClick={toggleReaderType}><span>Leitura:</span> <h3>{readerType }</h3></button>
            {readerType === 'paginação' ? <PagedReader /> : <VerticalReader />}
        </div>
    )
}