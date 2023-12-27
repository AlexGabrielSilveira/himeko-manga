"use client";

import Input from "@/components/inputs/Input";
import { api } from "@/services/api";
import { useState } from "react"
import styles from "./styles.module.css"
import { useRouter } from "next/navigation";

export default function ScanlatorRegister() {  
    const router = useRouter()
    const[message, setMessage] = useState('')
    const[scanlator, setScanlator] = useState({
        name: "",
        url: "",
        logo: ""
    })

    function handleName(e: React.ChangeEvent <HTMLInputElement>) {
        setScanlator({...scanlator, name: e.target.value})
    }
    function handleUrl(e: React.ChangeEvent <HTMLInputElement>) {
        setScanlator({...scanlator, url: e.target.value})
    }
    function handleUpload(e: React.ChangeEvent ) {
        setScanlator({...scanlator, logo: e.target.files[0] })
    }

    async function handleSubmit(e: any) {
        e.preventDefault()

        const formData = new FormData()
        formData.append('logo', scanlator.logo)
        formData.append('name', scanlator.name)
        formData.append('url', scanlator.url)

        let res = await api.post('/admin/scanlator', formData)
        setMessage(res.data.msg)

        setTimeout(() => {
            router.push('/')
        }, 1000)
    }
    return (
    <main>         
        {message && <p className={styles.message}>{message}</p>}
        <form method="post" onSubmit={handleSubmit} className={styles.form}>             
            <Input type="text" placeholder="nome do grupo" onChange={handleName} />
            <Input type="url"  placeholder="site/discord" onChange={handleUrl} />
            <Input type="file" placeholder="" onChange={handleUpload}/>
            <button type="submit" className={styles.submit_button}>Cadastrar</button>         
        </form>     
    </main>     
)   
}