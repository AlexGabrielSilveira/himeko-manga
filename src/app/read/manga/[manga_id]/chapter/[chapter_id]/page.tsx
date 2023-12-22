"use client";
import { Reader } from "@/components/Reader";
import { ReaderManagerProvider } from "@/contexts/ReaderManager";
import { api } from "@/services/api";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ReadPage() {
    return (
        <main>
            <ReaderManagerProvider>
                <Reader />
            </ReaderManagerProvider>
        </main>
    );
}
