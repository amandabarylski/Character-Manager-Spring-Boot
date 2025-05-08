import { Faction } from '../types';
import { useState } from 'react';
import DeleteModal from '../Modals/DeleteModal';

interface FactionDetailsProps {
	faction: Faction
	deselectFaction: () => void
	deselectAll: () => void
	fetchFactions: () => void
	fetchCharacters: () => void
	fetchPlotlines: () => void
	fetchSkills: () => void
}


function FactionDetails({ faction, deselectFaction, deselectAll, 
	fetchCharacters, fetchFactions, fetchPlotlines, fetchSkills } : FactionDetailsProps) {

		
	const[isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

	//Because there could be a cascade that deletes characters, every table could be affected by a faction being deleted.
	//Thus, I had to pass down all of my get all methods so a deleted character would not appear where they shouldn't.
	const deleteFaction = async (factionId: number) => {
		try {
			const response = await fetch(`/character_manager/faction/${factionId}`, {
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
	
	//I was able to copy and paste most of this code from my character details file, changing the contents but keeping the styling consistent.
	return (<>
		<DeleteModal closeModal={()=> setIsDeleteModalOpen(false)} show={isDeleteModalOpen}
				dataType='Faction' deleteFunction={()=> deleteFaction(faction.factionId)} />
		
		<div className="detail-container">
			<section className="detail-section">
				<h3 className={faction.accentColor}>{faction.factionName}</h3>
				<button type="button" className="hide-details" onClick={()=> deselectFaction()}>See Less</button>
			</section>
			<section className="detail-section">
				<p>{faction.description}</p>
			</section>
			<section className="detail-list">
				<h3 className={faction.accentColor}>Members:</h3>
				<ul>
					{faction.characters.map((character) => (
						<li>{character.characterName}</li>
					))}
				</ul>
			</section>
			<section className="detail-buttons">
				<button type="button" className="delete-button" onClick={()=> setIsDeleteModalOpen(true)}>Delete</button>
			</section>
		</div>
	</>)
	
}

export default FactionDetails