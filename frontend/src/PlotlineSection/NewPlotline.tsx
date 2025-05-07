import { CharacterInfo, PlotlineModel } from '../types';
import { ChangeEvent, useState } from 'react';
import PostModal from '../Modals/PostModal';

interface NewPlotlineProps {
	setFormOpen: (isOpen: boolean) => void
	allCharacters: CharacterInfo[]
	fetchCharacters: () => void
	fetchPlotlines: () => void
}

function NewPlotline({ setFormOpen, allCharacters, fetchCharacters, fetchPlotlines } : NewPlotlineProps) {
	
	//Like the new character from, I created a new type to allow for an empty array to have the number type.
	const[formValues, setFormValues] = useState<PlotlineModel>({
		plotlineName: "",
		description: "",
		duration: "",
		active: true,
		characters: []
	})
	
	//I copied and pasted my post modal state and my general handleChange.
	const[isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false)

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
	    setFormValues({ 
	        ...formValues, 
	        [event.target.name]: event.target.value
		})
	}
	
	//While I referred to the checklist change functions from my new character form while making this one,
	//it didn't seem efficient to copy and paste and have to change every variable.
	const handleCharacterCheck = (event: ChangeEvent<HTMLInputElement>) => {
		const checkedCharacter = Number(event.target.value)
		event.target.checked ? setFormValues({
			...formValues,
			characters: [...formValues.characters, checkedCharacter]
		}) : setFormValues({
			...formValues,
			characters: formValues.characters.filter(character => character !== checkedCharacter)
		})
	}
	
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		setIsPostModalOpen(true)
	}
	
	const postPlotline = async () => {
		
		try {
			await fetch("/character_manager/plotline", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formValues)
			})
			fetchCharacters()
			fetchPlotlines()
			setIsPostModalOpen(false)
			setFormOpen(false)
		} catch (error) {
			console.log('Error: ', error)
		}
		
	}
	
	return (<>
		<PostModal closeModal={()=> setIsPostModalOpen(false)} show={isPostModalOpen} 
				dataType={"Plotline"} postFunction={()=> postPlotline()} />
				
		<div className="column-header">
			<h2>New Plotline</h2>
		</div>
		<form className="detail-container" onSubmit={handleSubmit}>
			<section className="detail-section">
				<label htmlFor="plotlineName">Title:</label>
				<input type="text" name="plotlineName" id="plotlineName" value={formValues.plotlineName} onChange={handleChange}></input>
			</section>
			
			<section className="detail-section">
				<label htmlFor="description">Description:</label>
				<textarea name="description" id="description" value={formValues.description} onChange={handleChange}></textarea>
			</section>
			
			<section className="detail-section">
				<label htmlFor="duration">Duration:</label>
				<input type="text" name="duration" id="duration" value={formValues.duration} onChange={handleChange}></input>
				
				<label htmlFor="active">Currently Active?</label>
				<select name="active" id="active" onChange={handleChange}>
					<option value="true">Yes</option>
					<option value="false">No</option>
				</select>
			</section>
			
			<section className="detail-list">
				<h3>Involved Characters:</h3>
				<div className="checkbox-list">
				{allCharacters.map((character) => (
					<label key={character.characterId} className="checkbox">
						<input type="checkbox" 
						value={character.characterId} 
						checked={formValues.characters.includes(character.characterId)} 
						onChange={handleCharacterCheck} />
						{character.characterName}
					</label>
				))}
				</div>
			</section>
			
			<section className="detail-buttons">
				<button type="submit" className="submit-button">Add Plotline</button>
				<button type="button" className="cancel-button" onClick={()=> setFormOpen(false)}>Cancel</button>
			</section>
		</form>
	</>)
	
}

export default NewPlotline