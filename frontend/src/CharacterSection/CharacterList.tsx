import { CharacterInfo, Faction, Skill, Plotline } from '../types';

type CharacterProps = {
	characterLoading: boolean
	characters: CharacterInfo[]
	factions: Faction[]
	plotlines: Plotline[]
	skills: Skill[]
}

function CharacterList({characterLoading, characters, factions, plotlines, skills}: CharacterProps) {
	
	return (
		<div  id="character-list">
		{characterLoading ? (
			<p className="loading">Fetching characters...</p>
		) : (
			<div>
			<h2>Characters</h2>
				{characters.map((character) => (
					<div key={character.characterId} className="row">
						<h3 className={character.faction.accentColor}>{character.characterName}</h3>
					</div>
				))}
			</div>
		)}
		</div>
	)
}

export default CharacterList