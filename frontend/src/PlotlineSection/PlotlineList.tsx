


type PlotlineProps = {
	plotlineLoading: boolean
	plotlines: []
	characters: []
}

function PlotlineList({plotlineLoading, plotlines, characters}: PlotlineProps) {
	
	
	return (
		<>{plotlineLoading ? (
			<p className="loading">Fetching plotlines...</p>
		) : (
			<div className="sidebar" id="plotline-list">
				<h2>Plotlines</h2>
				{plotlines.map((plotline) => (
					<div className="row">
						<h3 className="plotline-title">{plotline.plotlineName}</h3>
					</div>
				))}
			</div>
		)}</>
		)
}

export default PlotlineList