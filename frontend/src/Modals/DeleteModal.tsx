import { FC } from 'react';

interface DeleteModalProps {
	closeModal: () => void
	show: boolean
	dataType: string
	deleteFunction: () => void
}


const DeleteModal: FC<DeleteModalProps> = ({closeModal, show, dataType, deleteFunction}) => {
	
	return (
		<dialog style={{display: show ? "block" : "none"}}>
			<div className="dialog-interior">
				<h2 className="dialog-header">Delete {dataType}</h2>
				<p>Are you sure? This can't be undone.</p>
				<div className="dialog-buttons">
					<button type="button" className="delete-button" onClick={deleteFunction}>Delete</button>
					<button type="button" className="cancel-button" onClick={closeModal}>Cancel</button>
				</div>
			</div>
		</dialog>
	)
	
}

export default DeleteModal