"use client"

import { useAmp } from 'next/amp'
import styles from './adm.module.css'
import { useState } from 'react'
import Register from '@/components/register/Register'
import Update from '@/components/update/Update'
import Change from '@/components/change/Change'

export default function Adm() {
    const[registerVisibility, setRegisterVisibility] = useState(false)
    const[changeVisibility, setChangeVisibility] = useState(false)
    const[updateVisibility, setUpdateVisibility] = useState(false)

    function handleRegister () {
        setRegisterVisibility(!registerVisibility)
    }
    function handleChange () {
        setChangeVisibility(!changeVisibility)
    }
    function handleUpdate () {
        setUpdateVisibility(!updateVisibility)
    }
    return(
        <main className={styles.main_container}>
            <div className={styles.adm_opts}>
                <div className={styles.register}>
                    <button onClick={handleRegister}>Cadastrar</button>
                    {registerVisibility == true ? (<Register />) : ""}
                </div>
                <div className={styles.change}>
                    <button onClick={handleChange}>Alterar</button>
                    {changeVisibility == true ? (<Change />) : ""}
                </div>
                <div className={styles.update}>
                    <button onClick={handleUpdate}>Upar</button>
                    {updateVisibility == true ? (<Update />) : ""}
                </div>
                
            </div>
        </main>
    )
}