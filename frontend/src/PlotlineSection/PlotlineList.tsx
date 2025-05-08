import { CharacterInfo, Plotline } from '../types';
import { useState } from 'react';
import PlotlineRow from './PlotlineRow';
import PlotlineDetails from './PlotlineDetails';
import NewPlotline from './NewPlotline';


interface PlotlineProps {
	plotlineLoading: boolean
	plotlines: Plotline[]
	characters: CharacterInfo[]
	fetchCharacters: () => void
	fetchPlotlines: () => void
	selectedPlotline: Plotline
	setSelectedPlotline: (selected: Plotline) => void
	deselectPlotline: () => void
	deselectAll: () => void
}

function PlotlineList({plotlineLoading, plotlines, characters, fetchCharacters, fetchPlotlines,
	selectedPlotline, setSelectedPlotline, deselectPlotline, deselectAll
}: PlotlineProps) {
	
	const[formOpen, setFormOpen] = useState<boolean>(false)
	
	//Again adding the selection method I used for characters here.
/*	const[selected, setSelected] = useState<Plotline>({
		plotlineId: -1,
		plotlineName: "",
		description: "",
		duration: "",
		active: false,
		characters: []
	})
	
	const deselectPlotline = () => {
		setSelected({
				plotlineId: -1,
				plotlineName: "",
				description: "",
				duration: "",
				active: false,
				characters: []
			})
	}*/
	
	const fetchPlotlineById = async (plotlineId: number) => {
		try {
			const response = await fetch(`/character_manager/plotline/${plotlineId}`)
			if (!response.ok) {
				throw new Error(`Could not retrieve plotline with Id: ${plotlineId}`)
			}
			const data = await response.json()
			setSelectedPlotline(data)
		} catch (error) {
			console.log('Error: ', error)
		}
	}
	
	//I had to have an extra div to hold my header and rows as otherwise Typescript gave me a parsing error.
	//The same thing happened in my other list files as well.
	//I decided to put this comment in this file rather than the others as plotlines have less funcionality so it won't be as busy.
	return (
		<div className="sidebar" id="plotline-list">
		{formOpen ? (
			<NewPlotline setFormOpen={setFormOpen} allCharacters={characters} fetchCharacters={fetchCharacters} 
			fetchPlotlines={fetchPlotlines} deselectAll={deselectAll} />
		) : (
		<>{plotlineLoading ? (
			<p className="loading">Fetching plotlines...</p>
		) : (
			<div>
				<div className="column-header">
					<h2>Plotlines</h2>
					<button type="button" className="open-form-button" onClick={()=> setFormOpen(true)}>New</button>
				</div>
				{plotlines.map((plotline) => (
					(plotline.plotlineId === selectedPlotline.plotlineId) ? 
					(<PlotlineDetails key={selectedPlotline.plotlineId} plotline={selectedPlotline} deselectPlotline={deselectPlotline} />) :
					(<PlotlineRow key={plotline.plotlineId} plotline={plotline} fetchPlotlineById={fetchPlotlineById} />)
				))}
			</div>
		)}</>
		)}
		</div>
		)
}

export default PlotlineList