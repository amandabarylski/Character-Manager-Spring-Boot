import { ChangeEvent, useState } from 'react';
import PostModal from '../Modals/PostModal';


interface NewFactionProps {
	setFormOpen: (isOpen: boolean) => void
	fetchFactions: () => void
	deselectAll: () => void
}

function NewFaction({ setFormOpen, fetchFactions, deselectAll } : NewFactionProps) {
	
	//My formValues are much simpler here than for characters or plotlines, as characters are only added to the faction later.
	const[formValues, setFormValues] = useState({
		factionName: "",
		description: "",
		accentColor: ""
	})
	
	//A lot of what I needed could be copied and pasted from the new character component.
	const[isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false)
	
	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
	    setFormValues({ 
	        ...formValues, 
	        [event.target.name]: event.target.value
		})
	}
	
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		setIsPostModalOpen(true)
	}
	
	//Creating a faction only affects the faction table, so I only needed one fetch request here.
	const postFaction = async () => {
		
		try {
			const response = await fetch("/character_manager/faction", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formValues)
			});
			if(!response.ok) {
				throw new Error("Network response was not ok.")
			}
			deselectAll()
			fetchFactions()
			setIsPostModalOpen(false)
			setFormOpen(false)
		} catch (error) {
			console.log('Error: ', error)
		}
		
	}
	
	return (<>
		<PostModal closeModal={()=> setIsPostModalOpen(false)} show={isPostModalOpen} 
				dataType={"Faction"} postFunction={()=> postFaction()} />
		
		<div className="column-header">
			<h2>New Faction</h2>
		</div>
		<form className="detail-container" onSubmit={handleSubmit}>
			<section className="detail-section">
				<label htmlFor="factionName">Name:</label>
				<input type="text" name="factionName" id="factionName" value={formValues.factionName} onChange={handleChange}></input>
				
				<label htmlFor="accentColor">Color:</label>
				<select name="accentColor" id="accentColor" onChange={handleChange}>
					<option value=""></option>
					<option value="red" className="red">Red</option>
					<option value="blue" className="blue">Blue</option>
					<option value="green" className="green">Green</option>
					<option value="purple" className="purple">Purple</option>
					<option value="orange" className="orange">Orange</option>
				</select>
			</section>
			
			<section className="detail-section">
				<label htmlFor="description">Description:</label>
				<textarea name="description" id="description" value={formValues.description} onChange={handleChange}></textarea>
			</section>
			
			<section className="detail-buttons">
				<button type="submit" className="submit-button">Add Faction</button>
				<button type="button" className="cancel-button" onClick={()=> setFormOpen(false)}>Cancel</button>
			</section>
		</form>
	</>)
	
}

export default NewFaction