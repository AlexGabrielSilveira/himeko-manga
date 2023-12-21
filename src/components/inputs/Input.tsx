import React, { ChangeEvent } from 'react';
import styles from './styles.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>  {
    
}

export default function Input(props:InputProps) {
    return (
        <input
            className={styles.input}
            {...props}
        />
    )
}