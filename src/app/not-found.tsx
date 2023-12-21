import Image from "next/image";
import Link from "next/link";

export default function custom404() {
    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
            <Image src="/duck.gif" width="383" height="480" alt="404gif"/>
            <h1>you are so far away, <Link href="/"><u>come home</u></Link></h1>
        </div>
    )
}