"use client"
import AdmRegister from "../../components/admin/register/page";
import ScanlatorRegister from "../../components/admin/scanlator/page";
import AdmUpdateChapter from "../../components/admin/upload/page";
import { useState } from "react";
import styles from './adm.module.css'
import Modal from "@/components/modal/Modal";

export default function Admin() {
    const [isAdmRegisterModalOpen, setIsAdmRegisterModalOpen] = useState(false);
    const [isAdmUpdateChapterModalOpen, setIsAdmUpdateChapterModalOpen] = useState(false);
    const [isScanlatorRegisterModalOpen, setIsScanlatorRegisterModalOpen] = useState(false);

    function handleOpenAdmRegisterModal() {
        setIsAdmRegisterModalOpen(true);
    }

    function handleCloseAdmRegisterModal() {
        setIsAdmRegisterModalOpen(false);
    }

    function handleOpenAdmUpdateChapterModal() {
        setIsAdmUpdateChapterModalOpen(true);
    }

    function handleCloseAdmUpdateChapterModal() {
        setIsAdmUpdateChapterModalOpen(false);
    }

    function handleOpenScanlatorRegisterModal() {
        setIsScanlatorRegisterModalOpen(true);
    }

    function handleCloseScanlatorRegisterModal() {
        setIsScanlatorRegisterModalOpen(false);
    }

return (
    <main className={styles.container}>
        <button onClick={handleOpenAdmRegisterModal}>Registrar Manga!</button>
        <button onClick={handleOpenAdmUpdateChapterModal}>Upar Capitulo!</button>
        <button onClick={handleOpenScanlatorRegisterModal}>Registrar scanlator</button>
        <div>
            <Modal isOpen={isAdmRegisterModalOpen} onRequestClose={handleCloseAdmRegisterModal}>
                <AdmRegister />
            </Modal>
            <Modal isOpen={isAdmUpdateChapterModalOpen} onRequestClose={handleCloseAdmUpdateChapterModal}>
                <AdmUpdateChapter />
            </Modal>
            <Modal isOpen={isScanlatorRegisterModalOpen} onRequestClose={handleCloseScanlatorRegisterModal}>
                <ScanlatorRegister />
            </Modal>
        </div>
    </main>
    )
}
