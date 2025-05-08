import { CharacterInfo, Faction } from '../types';
import { useState } from 'react';
import FactionRow from './FactionRow';
import FactionDetails from './FactionDetails';
import NewFaction from './NewFaction'

interface FactionProps {
	factionLoading: boolean
	factions: Faction[]
	fetchFactions: () => void
	fetchCharacters: () => void
	selectedFaction: Faction
	setSelectedFaction: (selected: Faction) => void
	deselectFaction: () => void
	deselectAll: () => void
}

function FactionList({factionLoading, factions, fetchFactions, fetchCharacters,
	selectedFaction, setSelectedFaction, deselectFaction, deselectAll }: FactionProps) {
	
	const[formOpen, setFormOpen] = useState<boolean>(false)
	
	//I used the same select and deselect process as I did for the character list since I worked on it first.
/*	const[selected, setSelected] = useState<Faction>({
		factionId: -1,
		factionName: "",
		description: "",
		accentColor: "",
		characters: []
	})
	
	const deselectFaction = () => {
		setSelected({
				factionId: -1,
				factionName: "",
				description: "",
				accentColor: "",
				characters: []
			})
	}*/
	
	const fetchFactionById = async (factionId: number) => {
		try {
			const response = await fetch(`/character_manager/faction/${factionId}`)
			if (!response.ok) {
				throw new Error(`Could not retrieve faction with Id: ${factionId}`)
			}
			const data = await response.json()
			setSelectedFaction(data)
		} catch (error) {
			console.log('Error: ', error)
		}
	}
	
	
	return (
		<div className="sidebar" id="faction-list">
		{formOpen ? (
			<NewFaction setFormOpen={setFormOpen} fetchFactions={fetchFactions} deselectAll={deselectAll} />
		) : (
		<>{factionLoading ? (
			<p className="loading">Fetching factions...</p>
		) : (
			<div>
				<div className="column-header">
					<h2>Factions</h2>
					<button type="button" className="open-form-button" onClick={()=> setFormOpen(true)}>New</button>
				</div>
				{factions.map((faction) => (
					(faction.factionId === selectedFaction.factionId) ? 
					(<FactionDetails key={selectedFaction.factionId} faction={selectedFaction} 
						deselectFaction={deselectFaction} deselectAll={deselectAll} />) :
					(<FactionRow key={faction.factionId} faction={faction} fetchFactionById={fetchFactionById} />)
				))}
			</div>
		)}</>
		)}
		</div>
	)
}

export default FactionList