import { Plotline } from '../types';

interface PlotlineDetailsProps {
	plotline: Plotline
	deselectPlotline: () => void
	fetchPlotlines: () => void
	fetchPlotlineById: (id: number) => void
	
}


function PlotlineDetails({ plotline, deselectPlotline, fetchPlotlines, fetchPlotlineById } : PlotlineDetailsProps) {
	
	//I set up the detail component without the post method at first.
	//It felt a little strange to not have a content type or body, but since only one element is being changed,
	//the only requirement on my back end was the plotline id.
	//After switching between active and inactive I fetched the selected plotline again so that it would visibly update on the front end.
	//I also did a general fetch on the plotline list so that once it was deselected it would still show the change.
	const togglePlotline = async (plotlineId: number) => {
		try {
			await fetch(`/character_manager/plotline/${plotlineId}`, {
				method: "PUT"
			})
			fetchPlotlines()
			fetchPlotlineById(plotlineId)
		} catch (error) {
			console.log('Error: ', error)
		}
	}
	
	
	return (
		<div className="detail-container">
			<section className="detail-section">
				<h3 className={plotline.active ? "" : "inactive"}>{plotline.plotlineName}</h3>
				<button type="button" className="hide-details" onClick={()=> deselectPlotline()}>See Less</button>
			</section>
			<section className="detail-section">
				<p>{plotline.description}</p>
			</section>
			<section className="detail-list">
				<h3>Involved Characters:</h3>
				<ul>
					{plotline.characters.map((character) => (
						<li>{character.characterName}</li>
					))}
				</ul>
			</section>
			<section className="detail-section">
				<p><strong className={plotline.active ? "" : "inactive"}>Duration: </strong>{plotline.duration ? plotline.duration : "unknown"}</p>
				<p className={plotline.active ? "" : "inactive"}>{plotline.active ? "Currently Active" : "Not Currently Active"}</p>
			</section>
			<section className="detail-buttons">
				<button type="button" className={plotline.active ? "toggle-to-inactive" : "toggle-to-active"} 
				onClick={()=> togglePlotline(plotline.plotlineId)}>
				{plotline.active ? "Set to Not Active" : "Set to Active"}
				</button>
			</section>
		</div>
	)
	
}

export default PlotlineDetails