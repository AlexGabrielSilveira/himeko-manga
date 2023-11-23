import { useReaderManager } from "@/contexts/ReaderManager"
import { PagedReader } from "./PagedReader"
import { VerticalReader } from "./VerticalReader"

export function Reader(): JSX.Element {
    const { readerType, toggleReaderType } = useReaderManager()

    return (
        <div>
            <h1>Leitor</h1>
            <button onClick={toggleReaderType}>Botao trocador de tipo de leitor</button>

            {readerType === 'paged' ? <PagedReader /> : <VerticalReader />}
        </div>
    )
}