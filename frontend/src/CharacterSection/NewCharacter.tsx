import { Faction, Skill, Plotline, CharacterModel } from '../types';
import { ChangeEvent, useState } from 'react';
import PostModal from '../Modals/PostModal';

interface NewCharacterProps {
	factions: Faction[]
	allSkills: Skill[]
	allPlotlines: Plotline[]
	setFormOpen: (isOpen: boolean) => void
	fetchFactions: () => void
	fetchCharacters: () => void
	fetchPlotlines: () => void
	fetchSkills: () => void
	deselectAll: () => void
}

function NewCharacter({ factions, allSkills, allPlotlines, setFormOpen, 
	fetchFactions, fetchCharacters, fetchPlotlines, fetchSkills, deselectAll } : NewCharacterProps) {
	
//	const[skillList, setSkillList] = useState<string[]>([])
//	const[plotlineList, setPlotlineList] = useState<number[]>([])
	
	//The first thing I did was set up my form values, matching it to my CharacterModel so I could pass it into my post request.
	//I referred back to my final two front end projects for the React forms.
	//I initially just had empty arrays for skills and plotlines, but Typescript wouldn't let my add strings or numbers to them,
	//as it considered them to by type "never."
	//I then used new state variables inside of the form values state.
	//Later I went back and added CharacterModel to my types, meaning I could implicitly set the types of the empty arrays.
	//I opted to comment out my no longer needed code rather than deleting it.
	const[formValues, setFormValues] = useState<CharacterModel>({
		characterName: "",
		race: "",
		gender: "",
		description: "",
		factionId: 0,
		skills: [],
		plotlines: []
	})
	
	const[isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false)
	
	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
	    setFormValues({ 
	        ...formValues, 
	        [event.target.name]: event.target.value
		})
	}
	
	//The articles I found online to describe how to add and remove checkbox values from an array used only the array as their state.
	//So I decided to do the same and add the arrays into the form values when submitting the form.
	//I then used two separate handle check functions as well.
	//With a little bit of work I found a way to target the arrays inside of the form values state.
	//I still kept the check handlers separate since the arrays take different values,
	//and it is also clearer to have the actual variable names for the methods rather than having a lot of variables.
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
	
	//My handleSubmit sets the form value skill and plotline arrays to my other pieces of state,
	//then pulls up my confirmation modal, passing the form values to it.
	//If the user cancels from the modal, the skill and plotline arrays will still have the information,
	//but it will be overriden the next time they submit the form.
	
	//I commented out my setFormValues as I no longer needed it with the changes I made to my main state variable.
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
/*		await setFormValues({
			...formValues,
			skills: skillList,
			plotlines: plotlineList
		})*/
		
		setIsPostModalOpen(true)
		
	}
	
	//When I decided to pass my post function into my modal, I separated it from the handleSubmit.
	//I had to call all of my general fetch requests since adding a character can alter all tables.
	//I almost didn't call fetchSkills, but I thought it would probably break my search function
	//as any newly created characters wouldn't be in any of the existing skills' character lists.
	const postCharacter = async () => {
		
		try {
			await fetch("/character_manager/character_table", {
				method: "POST",
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
			setIsPostModalOpen(false)
			setFormOpen(false)
		} catch (error) {
			console.log('Error: ', error)
		}
		
	}
	
	
	return (<>
		<PostModal closeModal={()=> setIsPostModalOpen(false)} show={isPostModalOpen} 
		dataType={"Character"} postFunction={()=> postCharacter()} />
		
		<div className="column-header">
			<h2>New Character</h2>
		</div>
		<form className="detail-container" onSubmit={handleSubmit}>
			<section className="detail-section">
				<label htmlFor="characterName">Name:</label>
				<input type="text" name="characterName" id="characterName" value={formValues.characterName} onChange={handleChange} required></input>
			</section>
			
			<section className="detail-section">
				<label htmlFor="factionId">Faction:</label>
					<select name="factionId" id="factionId" onChange={handleChange}>
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
				<button type="submit" className="submit-button">Add Character</button>
				<button type="button" className="cancel-button" onClick={()=> setFormOpen(false)}>Cancel</button>
			</section>
		</form>
	</>)
	
}

export default NewCharacter