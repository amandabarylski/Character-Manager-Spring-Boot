import { FC } from 'react';

interface PutModalProps {
	closeModal: () => void
	show: boolean
	putFunction: () => void
}


const PutModal: FC<PutModalProps> = ({ closeModal, show, putFunction }) => {
	
	//Since I was only using the put modal for character editing, it didn't need to be dynamic like the other two.
	return (
		<dialog style={{display: show ? "block" : "none"}}>
			<div className="dialog-interior">
				<h2 className="dialog-header">Save Character</h2>
				<p>Do you want to save your changes?</p>
				<div className="dialog-buttons">
					<button type="button" className="submit-button" onClick={putFunction}>Confirm</button>
					<button type="button" className="cancel-button" onClick={closeModal}>Go Back</button>
				</div>
			</div>
		</dialog>
	)
	
}

export default PutModal