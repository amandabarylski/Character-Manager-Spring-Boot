

type FactionProps = {
	factionLoading: boolean
	factions: []
	characters: []
}

function FactionList({factionLoading, factions, characters}: FactionProps) {
	
	
	return (
		<>{factionLoading ? (
			<p className="loading">Fetching factions...</p>
		) : (
			<div className="sidebar" id="faction-list">
					<h2>Factions</h2>
					{factions.map((faction) => (
						<div className="row">
							<h3 className={faction.accentColor}>{faction.factionName}</h3>
						</div>
					))}
			</div>
		)}</>
	)
}

export default FactionList