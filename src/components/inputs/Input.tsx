import React, { ChangeEvent } from 'react';
import styles from './styles.module.css';

interface InputProps {
    type: string;
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ type, placeholder, onChange }: InputProps) {
    return (
        <input
        type={type}
        placeholder={placeholder}
        className={styles.input}
        onChange={onChange}
        />
    )
}