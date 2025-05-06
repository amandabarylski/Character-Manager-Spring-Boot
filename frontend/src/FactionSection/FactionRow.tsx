import { Faction } from '../types';

interface FactionRowProps {
	faction: Faction
	fetchFactionById: (id: number) => void
}

function FactionRow ({ faction, fetchFactionById } : FactionRowProps) {
	
	return (
		<div className="row">
			<h3 className={faction.accentColor}>{faction.factionName}</h3>
			<button type="button" className="see-details" onClick={()=> fetchFactionById(faction.factionId)}>See More</button>
		</div>
	)
	
}

export default FactionRow