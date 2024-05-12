import styles from '../Styles/ConfirmDeleteModal.module.css'


function ConfirmDeleteModal({ deleteFunction, recepie, closeModal, questionDelete }) {

    return (
        <>
            {questionDelete &&
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Are you sure you want to delete {recepie.name}?</h2>
                        <button onClick={()=>closeModal()}>No</button>
                        <button onClick={() => { deleteFunction(); closeModal(); }}>Yes</button>
                    </div>
                </div>
            }
        </>
    )
}

export default ConfirmDeleteModal