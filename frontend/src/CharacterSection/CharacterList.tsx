//import AddCharacter from './AddCharacter'
//import UpdateCharacter from './UpdateCharacter'

type CharacterProps = {
	characterLoading: boolean
	characters: []
	factions: []
	plotlines: []
	skills: []
}

function CharacterList({characterLoading, characters, factions, plotlines, skills}: CharacterProps) {
	
	
	return (
		<>{characterLoading ? (
			<p className="loading">Fetching characters...</p>
		) : (
			<div id="character-list">
			<h2>Characters</h2>
				{characters.map((character) => (
					<div className="row">
						<h3 className={character.faction.accentColor}>{character.characterName}</h3>
					</div>
				))}
			</div>
		)}
		</>
	)
}

export default CharacterList