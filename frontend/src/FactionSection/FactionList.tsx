import { CharacterInfo, Faction } from '../types';
import { useState } from 'react';
import FactionRow from './FactionRow';
import FactionDetails from './FactionDetails';

interface FactionProps {
	factionLoading: boolean
	factions: Faction[]
	characters: CharacterInfo[]
}

function FactionList({factionLoading, factions, characters}: FactionProps) {
	
	const[formOpen, setFormOpen] = useState<boolean>(false)
	
	//I used the same select and deselect process as I did for the character list since I worked on it first.
	const[selected, setSelected] = useState<Faction>({
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
	}
	
	const fetchFactionById = async (factionId: number) => {
		try {
			const response = await fetch(`/character_manager/faction/${factionId}`)
			if (!response.ok) {
				throw new Error(`Could not retrieve faction with Id: ${factionId}`)
			}
			const data = await response.json()
			setSelected(data)
		} catch (error) {
			console.log('Error: ', error)
		}
	}
	
	
	return (
		<div className="sidebar" id="faction-list">
		{factionLoading ? (
			<p className="loading">Fetching factions...</p>
		) : (
			<div>
				<div className="column-header">
					<h2>Factions</h2>
				</div>
				{factions.map((faction) => (
					(faction.factionId === selected.factionId) ? 
					(<FactionDetails key={selected.factionId} faction={selected} deselectFaction={deselectFaction} />) :
					(<FactionRow key={faction.factionId} faction={faction} fetchFactionById={fetchFactionById} />)
				))}
			</div>
		)}
		</div>
	)
}

export default FactionList