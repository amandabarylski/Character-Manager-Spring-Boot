import { CharacterInfo, Faction, Skill, Plotline } from '../types';
import { useState } from 'react';
import EditCharacter from './EditCharacter';
import DeleteModal from '../Modals/DeleteModal';

interface CharacterDetailsProps {
	character: CharacterInfo
	factions: Faction[]
	plotlines: Plotline[]
	skills: Skill[]
	deselectCharacter: () => void
	fetchFactions: () => void
	fetchCharacters: () => void
	fetchPlotlines: () => void
	fetchSkills: () => void
	fetchCharacterById: (id: number) => void
	deselectAll: () => void
}


function CharacterDetails ({ character, factions, plotlines, skills, deselectCharacter, fetchFactions, fetchCharacters, 
	fetchPlotlines, fetchSkills, fetchCharacterById, deselectAll } : CharacterDetailsProps) {
	
	//I originally passed the setFormOpen from the character list into this component,
	//but once I decided to have separate form components for create and edit I needed them to be separate.
	const[formOpen, setFormOpen] = useState<boolean>(false)
	
	const[isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
	
	//I remembered that I should be storing my requests as a response variable even outside of get requests so I could catch errors.
	//After adding it here I went back through all of my post and put requests to add it as well.
	const deleteCharacter = async (characterId: number) => {
		try {
			const response = await fetch(`/character_manager/character_table/${characterId}`, {
				method: "DELETE"
			});
			if(!response.ok) {
				throw new Error("Network response was not ok.")
			}
			deselectAll()
			fetchFactions()
			fetchCharacters()
			fetchPlotlines()
			fetchSkills()
			setIsDeleteModalOpen(false)
		} catch (error) {
			console.log("Error: ", error)
		}
	}
	
	return (<>
		<DeleteModal closeModal={()=> setIsDeleteModalOpen(false)} show={isDeleteModalOpen}
		dataType='Character' deleteFunction={()=> deleteCharacter(character.characterId)} />
		
		{formOpen ? (
			<EditCharacter character={character} factions={factions} allSkills={skills} allPlotlines={plotlines}
			setFormOpen={setFormOpen} fetchCharacters={fetchCharacters} fetchFactions={fetchFactions} fetchSkills={fetchSkills}
			fetchPlotlines={fetchPlotlines} fetchCharacterById={fetchCharacterById} deselectAll={deselectAll} />
		) : (
		<div className="detail-container">
			<section className="detail-section">
				<h3 className={character.faction.accentColor}>{character.characterName}</h3>
				<button type="button" className="hide-details" onClick={()=> deselectCharacter()}>See Less</button>
			</section>
			<section className="detail-section">
				<p><strong className={character.faction.accentColor}>Member of: </strong>{character.faction.factionName}</p>
			</section>
			<section className="detail-section">
				<p><strong className={character.faction.accentColor}>Race: </strong>{character.race ? character.race : "unknown"}</p>
				<p><strong className={character.faction.accentColor}>Gender: </strong>{character.gender ? character.gender : "unknown"}</p>
			</section>
			<section className="detail-section">
				<p>{character.description}</p>
			</section>
			<section className="detail-list">
				<h3 className={character.faction.accentColor}>Skills</h3>
				<ul>
					{character.skills.map((skill) => (
						<li key={skill.skillId}>{skill.skillName}</li>
					))}
				</ul>
			</section>
			<section className="detail-list">
				<h3 className={character.faction.accentColor}>Involved in:</h3>
				<ul>
					{character.plotlines.map((plotline) => (
						<li key={plotline.plotlineId}>{plotline.plotlineName}</li>
					))}
				</ul>
			</section>
			<section className="detail-buttons">
				<button type="button" className="open-form-button" onClick={()=> setFormOpen(true)}>Edit</button>
				<button type="button" className="delete-button" onClick={()=> setIsDeleteModalOpen(true)}>Delete</button>
			</section>
		</div>
		)}
	</>)
	
}

export default CharacterDetails