import { CharacterInfo, Faction, Skill, Plotline } from '../types';
import { useState } from 'react';
import CharacterRow from './CharacterRow';
import CharacterDetails from './CharacterDetails';
import SearchBar from './SearchBar';
import NewCharacter from './NewCharacter';

interface CharacterProps {
	characterLoading: boolean
	setCharacterLoading: (loading: boolean) => void
	characters: CharacterInfo[]
	factions: Faction[]
	plotlines: Plotline[]
	skills: Skill[]
	fetchFactions: () => void
	fetchCharacters: () => void
	fetchPlotlines: () => void
	fetchSkills: () => void
}

function CharacterList({characterLoading, setCharacterLoading, characters, factions, plotlines, skills, 
	fetchFactions, fetchCharacters, fetchPlotlines, fetchSkills }: CharacterProps) {
	
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
	//I had to use a lot of parentheses and curly braces to get my options to work.
	//The only thing changing between the two maps is the array being mapped, with all other functions remaining the same.
	//As the filteredList will always be an array, with my clear search emptying that array, I was able to use the .length property in my ternary.
	return (
		<div  id="character-list">
		{formOpen ? (
			<NewCharacter factions={factions} allSkills={skills} allPlotlines={plotlines} setFormOpen={setFormOpen}
			fetchFactions={fetchFactions} fetchCharacters={fetchCharacters} fetchPlotlines={fetchPlotlines} fetchSkills={fetchSkills} />
				) : (
		<>{characterLoading ? (
			<p className="loading">Fetching characters...</p>
		) : (
			<div>
			<div className="column-header">
				<h2>Characters</h2>
				<button type="button" className="open-form-button" onClick={()=> setFormOpen(true)}>New</button>
			</div>
			<SearchBar skills={skills} fetchCharactersBySkill={fetchCharactersBySkill} setFilteredList={setFilteredList} />
			{(filteredList.length) < 1 ? 
				<>{characters.map((character) => (
					(character.characterId === selected.characterId) ? 
					(<CharacterDetails key={selected.characterId} character={selected} deselectCharacter={deselectCharacter}
						fetchFactions={fetchFactions} fetchCharacters={fetchCharacters} fetchPlotlines={fetchPlotlines}
						fetchSkills={fetchSkills} fetchCharacterById={fetchCharacterById} />) :
						
					(<CharacterRow key={character.characterId} character={character} fetchCharacterById={fetchCharacterById} />)
				))}</> :
				
				<>{filteredList.map((character) => (
					(character.characterId === selected.characterId) ? 
					(<CharacterDetails key={selected.characterId} character={selected} deselectCharacter={deselectCharacter}
						fetchFactions={fetchFactions} fetchCharacters={fetchCharacters} fetchPlotlines={fetchPlotlines}
						fetchSkills={fetchSkills} fetchCharacterById={fetchCharacterById} />) :
					
					(<CharacterRow key={character.characterId} character={character} fetchCharacterById={fetchCharacterById} />)
				))}</>
			}
			</div>
		)}</>
		)}
		</div>
	)
}

export default CharacterList