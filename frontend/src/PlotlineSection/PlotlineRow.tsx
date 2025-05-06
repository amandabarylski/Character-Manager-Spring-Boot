import { Plotline } from '../types';

interface PlotlineRowProps {
	plotline: Plotline
	fetchPlotlineById: (id: number) => void
}


function PlotlineRow({ plotline, fetchPlotlineById } : PlotlineRowProps) {
	
	return (
		<div className="row">
			<h3 className={plotline.active ? "" : "inactive"}>{plotline.plotlineName}</h3>
			<button type="button" className="see-details" onClick={()=> fetchPlotlineById(plotline.plotlineId)}>See More</button>
		</div>
	)
	
}

export default PlotlineRow