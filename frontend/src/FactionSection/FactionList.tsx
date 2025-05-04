import { CharacterInfo, Faction } from '../types';

type FactionProps = {
	factionLoading: boolean
	factions: Faction[]
	characters: CharacterInfo[]
}

function FactionList({factionLoading, factions, characters}: FactionProps) {
	
	
	return (
		<div className="sidebar" id="faction-list">
		{factionLoading ? (
			<p className="loading">Fetching factions...</p>
		) : (
			<div>
				<h2>Factions</h2>
				{factions.map((faction) => (
					<div key={faction.factionId} className="row">
						<h3 className={faction.accentColor}>{faction.factionName}</h3>
					</div>
				))}
			</div>
		)}
		</div>
	)
}

export default FactionList