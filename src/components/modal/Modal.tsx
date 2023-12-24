import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';
import styles from './modal.module.css'

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, children }) => (
        <ReactModal
        className={styles.modal}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', }}}
>
    {children}
    </ReactModal>
)

export default Modal;
