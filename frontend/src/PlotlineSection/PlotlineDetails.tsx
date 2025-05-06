import { Plotline } from '../types';

interface PlotlineDetailsProps {
	plotline: Plotline
	deselectPlotline: () => void
}


function PlotlineDetails({ plotline, deselectPlotline } : PlotlineDetailsProps) {
	
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
				<button type="button" className={plotline.active ? "toggle-to-inactive" : "toggle-to-active"}>
				{plotline.active ? "Set to Not Active" : "Set to Active"}
				</button>
			</section>
		</div>
	)
	
}

export default PlotlineDetails