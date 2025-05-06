import { CharacterInfo } from '../types';
import { useState } from 'react';

interface CharacterDetailsProps {
	character: CharacterInfo
	deselectCharacter: () => void
}


function CharacterDetails ({character, deselectCharacter} : CharacterDetailsProps) {
	
	//I originally passed the setFormOpen from the character list into this component,
	//but once I decided to have separate form components for create and edit I needed them to be separate.
	const[formOpen, setFormOpen] = useState<boolean>(false)
	
	return (
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
						<li>{skill.skillName}</li>
					))}
				</ul>
			</section>
			<section className="detail-list">
				<h3 className={character.faction.accentColor}>Involved in:</h3>
				<ul>
					{character.plotlines.map((plotline) => (
						<li>{plotline.plotlineName}</li>
					))}
				</ul>
			</section>
			<section className="detail-buttons">
				<button type="button" className="edit-button">Edit</button>
				<button type="button" className="delete-button">Delete</button>
			</section>
		</div>
	)
	
}

export default CharacterDetails