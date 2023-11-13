"use client";

import { api } from "@/services/api";
import { useState } from "react"

export default function ScanlatorRegister() {  
    const[scanlator, setScanlator] = useState({
        name: "",
        url: "",
        logo: ""
    })

    function handleName(e) {
        setScanlator({...scanlator, name: e.target.value})
    }
    function handleUrl(e) {
        setScanlator({...scanlator, url: e.target.value})
    }
    function handleUpload(e) {
        setScanlator({...scanlator, logo: e.target.files[0]})
    }

    function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData()
        formData.append('logo', scanlator.logo)
        formData.append('name', scanlator.name)
        formData.append('url', scanlator.url)

        api.post('/admin/scanlator', formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {

        }).catch(err => console.log(err))

    }
    return (
    <main>         
        <form method="post" onSubmit={handleSubmit}>             
            <input type="text" name="name" placeholder="nome do grupo" onChange={handleName} />
            <input type="url" name="url" placeholder="site/discord" onChange={handleUrl} />
            <input type="file" name="logo" title="logo do grupo" onChange={handleUpload}/>
            <button type="submit">Cadastrar</button>         
        </form>     
    </main>     
)   
}