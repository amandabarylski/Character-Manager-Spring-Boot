import { CharacterInfo, Plotline } from '../types';


type PlotlineProps = {
	plotlineLoading: boolean
	plotlines: Plotline[]
	characters: CharacterInfo[]
}

function PlotlineList({plotlineLoading, plotlines, characters}: PlotlineProps) {
	
	//I had to have an extra div to hold my header and rows as otherwise Typescript gave me a parsing error.
	//The same thing happened in my other list files as well.
	//I decided to put this comment in this file rather than the others as plotlines have less funcionality so it won't be as busy.
	return (
		<div className="sidebar" id="plotline-list">
		{plotlineLoading ? (
			<p className="loading">Fetching plotlines...</p>
		) : (
			<div>
				<h2>Plotlines</h2>
				{plotlines.map((plotline) => (
					<div key={plotline.plotlineId} className="row">
						<h3 className={plotline.active ? "" : "inactive"}>{plotline.plotlineName}</h3>
					</div>
				))}
			</div>
		)}
		</div>
		)
}

export default PlotlineList