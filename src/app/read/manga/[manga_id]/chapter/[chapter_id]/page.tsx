"use client";
import { Reader } from "@/components/Reader";
import { ReaderManagerProvider } from "@/contexts/ReaderManager";

export default function ReadPage() {
    return (
        <main>
            <ReaderManagerProvider>
                <Reader />
            </ReaderManagerProvider>
        </main>
    );
}
