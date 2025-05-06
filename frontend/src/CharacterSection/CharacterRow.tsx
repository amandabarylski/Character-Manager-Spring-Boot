import { CharacterInfo } from '../types';

interface CharacterRowProps {
	character: CharacterInfo
	fetchCharacterById: (id: number) => void
}


function CharacterRow ({ character, fetchCharacterById } : CharacterRowProps) {
	
	return (
		<div className="row">
			<h3 className={character.faction.accentColor}>{character.characterName}</h3>
			<button type="button" className="see-details" onClick={()=> fetchCharacterById(character.characterId)}>See More</button>
		</div>
	)
	
}

export default CharacterRow