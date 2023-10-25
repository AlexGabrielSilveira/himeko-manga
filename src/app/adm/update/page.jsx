import Image from "next/image";

export default function AdmUpdateChapter() {
    return (
        <main>
            <div className="select_manga">
                <select value="all_mmangas">
                    <option >one piece</option>
                    <option >naruto</option>
                    <option >dgrayman</option>
                </select>
            </div>  
            <form>
                <Image src="/test_read_page.webp" width="180" height="250"/>
                nome: <input type="text" placeholder="one piece"  disabled/>
                numero do cap: <input type="text" placeholder="Ex: cap 105, cap 105.5"/>
                nome da scan: <input type="text" placeholder="OPEX"  disabled/>
                imagens: <input type="image" />
            </form>
        </main>
    )
}