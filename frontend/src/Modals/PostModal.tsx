import { FC } from 'react';

interface PostModalProps {
	closeModal: () => void
	show: boolean
	dataType: string
	postFunction: () => void
}


const PostModal: FC<PostModalProps> = ({ closeModal, show, dataType, postFunction}) => {
	
	//Since I intended to use this modal for all three of my post requests, I let the data and path be defined by the new form components.
	//Later I decided to try passing the post function in from the parent component, simply calling it from the submit button.
/*	const postData = async (table: string, data: Object) => {
		try {
			await fetch(`/character_manager/${table}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			})
		} catch (error) {
			console.log('Error: ', error)
		}
		closeForm()
		closeModal()
	}*/
	
	
	//I based my modals off of the ones I made during my first react project in the front end class.
	return (
		<dialog style={{display: show ? "block" : "none"}}>
			<div className="dialog-interior">
				<h2 className="dialog-header">Save {dataType}</h2>
				<p>Are you done entering data?</p>
				<div className="dialog-buttons">
					<button type="button" className="submit-button" onClick={postFunction}>Confirm</button>
					<button type="button" className="cancel-button" onClick={closeModal}>Go Back</button>
				</div>
			</div>
		</dialog>
	)
}

export default PostModal