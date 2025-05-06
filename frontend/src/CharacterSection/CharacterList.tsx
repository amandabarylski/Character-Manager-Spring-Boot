import { CharacterInfo, Faction, Skill, Plotline } from '../types';
import { useState } from 'react';
import CharacterRow from './CharacterRow';
import CharacterDetails from './CharacterDetails';

interface CharacterProps {
	characterLoading: boolean
	setCharacterLoading: (loading: boolean) => void
	characters: CharacterInfo[]
	factions: Faction[]
	plotlines: Plotline[]
	skills: Skill[]
}

function CharacterList({characterLoading, setCharacterLoading, characters, factions, plotlines, skills}: CharacterProps) {
	
	const[formOpen, setFormOpen] = useState<boolean>(false)
	
	const[filteredList, setFilteredList] = useState<CharacterInfo[]>([])
	
	//I originally wanted selected to be null when no character was selected.
	//However, errors arose with that approach, so I provided an empty character to serve as the unselected form.
	const[selected, setSelected] = useState<CharacterInfo>({
		characterId: -1,
		characterName: "",
		race: "",
		gender: "",
		description: "",
		faction: {
			factionId: 0,
			factionName: "",
			description: "",
			accentColor: "",
			characters: []
		},
		skills: [],
		plotlines: []
	})
	
	//I didn't want to have to put the empty character in my onClick in the TSX, so I stored it in another function.
	const deselectCharacter = () => {
		setSelected({
				characterId: -1,
				characterName: "",
				race: "",
				gender: "",
				description: "",
				faction: {
					factionId: 0,
					factionName: "",
					description: "",
					accentColor: "",
					characters: []
				},
				skills: [],
				plotlines: []
			})
	}
	
	const fetchCharactersBySkill = async (skillName: string) => {
		setCharacterLoading(true)
		try {
			const response = await fetch(`/character_manager/skill/${skillName}/character_table`)
			if (!response.ok) {
				throw new Error('Could not retrieve characters.')
			}
			const data = await response.json()
			setFilteredList(data)
		} catch (error) {
			console.log('Error: ', error)
		}
		setCharacterLoading(false)
	}
	
	const fetchCharacterById = async (characterId: number) => {
		try {
			const response = await fetch(`/character_manager/character_table/${characterId}`)
			if (!response.ok) {
				throw new Error(`Could not retrieve character with Id: ${characterId}`)
			}
			const data = await response.json()
			setSelected(data)
		} catch (error) {
			console.log('Error: ', error)
		}
	}	
	
	
	//Return statement starts here:
	return (
		<div  id="character-list">
		{characterLoading ? (
			<p className="loading">Fetching characters...</p>
		) : (
			<div>
			<div className="column-header">
				<h2>Characters</h2>
			</div>
				{characters.map((character) => (
					(character.characterId === selected.characterId) ? 
					(<CharacterDetails key={selected.characterId} character={selected} deselectCharacter={deselectCharacter} />) :
					(<CharacterRow key={character.characterId} character={character} fetchCharacterById={fetchCharacterById} />)
				))}
			</div>
		)}
		</div>
	)
}

export default CharacterList