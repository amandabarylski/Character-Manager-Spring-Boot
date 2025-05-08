import { Faction, Skill, Plotline, CharacterModel, CharacterInfo } from '../types';
import { ChangeEvent, useState } from 'react';
import PutModal from '../Modals/PutModal';


interface EditCharacterProps {
	character: CharacterInfo
	factions: Faction[]
	allSkills: Skill[]
	allPlotlines: Plotline[]
	setFormOpen: (isOpen: boolean) => void
	fetchFactions: () => void
	fetchCharacters: () => void
	fetchPlotlines: () => void
	fetchSkills: () => void
	deselectAll: () => void
	fetchCharacterById: (id: number) => void
}

function EditCharacter ({ character, factions, allSkills, allPlotlines, setFormOpen, fetchFactions, fetchCharacters, 
	fetchPlotlines, fetchSkills, deselectAll, fetchCharacterById } : EditCharacterProps) {
	
	//I wanted to store my characterId since I would want to refer back to it after deselecting all,
	//in order to allow the user to return to the details of the character they were editing after closing the form.
	const characterId = character.characterId
	
	
	//I copied and pasted my formValues and handle change events and set the initial formValues to the values of the selected character.
	//Since the character model uses skill names and plotline ids instead of the full objects,
	//I mapped over those arrays in order to get the correct values.
	const[formValues, setFormValues] = useState<CharacterModel>({
		characterName: character.characterName,
		race: character.race,
		gender: character.gender,
		description: character.description,
		factionId: character.faction.factionId,
		skills: character.skills.map((skill) => skill.skillName),
		plotlines: character.plotlines.map((plotline) => plotline.plotlineId)
	})

	//Even though editing a character is the only put request that I felt warranted a confirmation modal,
	//I still put it in the same folder as my other modals to keep things more organized.
	const[isPutModalOpen, setIsPutModalOpen] = useState<boolean>(false)

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
	    setFormValues({ 
	        ...formValues, 
	        [event.target.name]: event.target.value
		})
	}

	const handleSkillCheck = (event: ChangeEvent<HTMLInputElement>) => {
		const checkedSkill = event.target.value
		event.target.checked ? setFormValues({
			...formValues,
			skills: [...formValues.skills, checkedSkill]}) :
		setFormValues({
			...formValues,
			skills: formValues.skills.filter(skill => skill !== checkedSkill)})
	}

	const handlePlotlineCheck = (event: ChangeEvent<HTMLInputElement>) => {
		const checkedPlotline = Number(event.target.value)
		event.target.checked ? setFormValues({
			...formValues,
			plotlines: [...formValues.plotlines, checkedPlotline]}) :
		setFormValues({
			...formValues,
			plotlines: formValues.plotlines.filter(plotline => plotline !== checkedPlotline)})
	}
	
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		setIsPutModalOpen(true)
	}
	
	//My put function is similar to my post function in that it calls full fetch requests after performing the put request.
	//However, it also then fetches the character with the id matching the put request, so that when the form is closed
	//the detail page of that character remains open.
	//Unfortunately if they are well down the list the user will have to scroll to see this as the re-fetching returns them to the top of the page.
	const putCharacter = async (characterId: number) => {
		
		try {
			await fetch(`/character_manager/character_table/${characterId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formValues)
			})
			deselectAll()
			fetchFactions()
			fetchCharacters()
			fetchPlotlines()
			fetchSkills()
			fetchCharacterById(characterId)
			setIsPutModalOpen(false)
			setFormOpen(false)
		} catch (error) {
			console.log('Error: ', error)
		}
		
	}
	
//I started by copying and pasting my new character form since all of the handle change and values would still match.
//I then adjusted the way the header appeared as I wanted the styling to match the character details panel.
	return (<>
		<PutModal closeModal={()=> setIsPutModalOpen(false)} show={isPutModalOpen} putFunction={() => putCharacter(characterId)} />
		
		<form className="detail-container" onSubmit={handleSubmit}>
			<section className="detail-section">
				<h2>Edit Character</h2>
			</section>
			<section className="detail-section">
				<label htmlFor="characterName">Name:</label>
				<input type="text" name="characterName" id="characterName" value={formValues.characterName} onChange={handleChange} required></input>
			</section>
			
			<section className="detail-section">
				<label htmlFor="factionId">Faction:</label>
					<select name="factionId" id="factionId" value={formValues.factionId} onChange={handleChange}>
						<option value={0}></option>
						{factions.map((faction) => (
							<option key={faction.factionId} value={faction.factionId}>{faction.factionName}</option>
						))}
					</select>
			</section>
			
			<section className="detail-section">
				<label htmlFor="race">Race:</label>
				<input type="text" name="race" id="race" value={formValues.race} onChange={handleChange}></input>
				
				<label htmlFor="gender">Gender:</label>
				<input type="text" name="gender" id="gender" value={formValues.gender} onChange={handleChange}></input>
			</section>
			
			<section className="detail-section">
				<label htmlFor="description">Description:</label>
				<textarea id="description" name="description" value={formValues.description} onChange={handleChange}></textarea>
			</section>
			
			<section className="detail-list">
				<h3>Skills</h3>
				<div className="checkbox-list">
				{allSkills.map((skill) => (
					<label key={skill.skillId} className="checkbox">
						<input type="checkbox" 
						value={skill.skillName} 
						checked={formValues.skills.includes(skill.skillName)} 
						onChange={handleSkillCheck} />
						{skill.skillName}
					</label>
				))}
				</div>
			</section>
			
			<section className="detail-list">
				<h3>Involved in:</h3>
				<div className="checkbox-list">
				{allPlotlines.map((plotline) => (
					<label key={plotline.plotlineId} className="checkbox">
						<input type="checkbox" 
						value={plotline.plotlineId} 
						checked={formValues.plotlines.includes(plotline.plotlineId)} 
						onChange={handlePlotlineCheck} />
						{plotline.plotlineName}
					</label>
				))}
				</div>
			</section>
			
			<section className="detail-buttons">
				<button type="submit" className="submit-button">Save Changes</button>
				<button type="button" className="cancel-button" onClick={()=> setFormOpen(false)}>Cancel</button>
			</section>
		</form>
	</>)
	
}

export default EditCharacter