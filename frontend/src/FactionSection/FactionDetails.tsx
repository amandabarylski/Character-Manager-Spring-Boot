import { Faction } from '../types';

interface FactionDetailsProps {
	faction: Faction
	deselectFaction: () => void
	deselectAll: () => void
}


function FactionDetails({ faction, deselectFaction, deselectAll } : FactionDetailsProps) {
	
	
	//I was able to copy and paste most of this code from my character details file, changing the contents but keeping the styling consistent.
	return (
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
				<button type="button" className="delete-button">Delete</button>
			</section>
		</div>
	)
	
}

export default FactionDetails