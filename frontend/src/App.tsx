import { useEffect, useState } from 'react';
import './App.css';
import { CharacterInfo, Faction, Skill, Plotline } from './types';
import CharacterList from './CharacterSection/CharacterList';
import FactionList from './FactionSection/FactionList';
import PlotlineList from './PlotlineSection/PlotlineList';

function App() {
	//After trying different ways to arrange my loading and other state variables,
	//I ultimately decided to use UseEffect in the main app to pre-fetch all of the data, including the skill list,
	//so that it would be simpler to set up my forms.
	//However, I also wanted loading to be separate on each component, so I add three loading state variables to pass down.
	
	const[factions, setFactions] = useState<Faction[]>([])
	const[factionLoading, setFactionLoading] = useState(false)
	
	const[characters, setCharacters] = useState<CharacterInfo[]>([])
	const[characterLoading, setCharacterLoading] = useState(false)
	
	const[plotlines, setPlotlines] = useState<Plotline[]>([])
	const[plotlineLoading, setPlotlineLoading] = useState(false)
	
	const[skills, setSkills] = useState<Skill[]>([])
	
	//I originally had my fetch requests inside of the useEffect function, but I moved them out in case I needed to call on them at other times.
	//This was good as when working on my post, put, and delete requests, I realized the changes would not appear on the front end
	//unless I fetched from the backend again.
	const fetchFactions = async () => {
		setFactionLoading(true)
		try {
			const response = await fetch('/character_manager/faction')
			if (!response.ok) {
				throw new Error('Could not retrieve factions.')
			}
			const data = await response.json()
			setFactions(data)
		} catch (error) {
			console.log('Error: ', error)
		}
		setFactionLoading(false)
	}

	const fetchCharacters = async () => {
		setCharacterLoading(true)
		try {
			const response = await fetch('/character_manager/character_table')
			if (!response.ok) {
				throw new Error('Could not retrieve characters.')
			}
			const data = await response.json()
			setCharacters(data)
		} catch (error) {
			console.log('Error: ', error)
		}
		setCharacterLoading(false)
	}

	const fetchPlotlines = async () => {
		setPlotlineLoading(true)
		try {
			const response = await fetch('/character_manager/plotline')
			if (!response.ok) {
				throw new Error('Could not retrieve plotlines.')
			}
			const data = await response.json()
			setPlotlines(data)
		} catch (error) {
			console.log('Error: ', error)
		}
		setPlotlineLoading(false)
	}

	const fetchSkills = async () => {
		try {
			const response = await fetch('/character_manager/skill')
			if (!response.ok) {
				throw new Error('Could not retrieve skills.')
			}
			const data = await response.json()
			setSkills(data)
		} catch (error) {
			console.log('Error: ', error)
		}
	}
	
	useEffect(() => {		
		fetchFactions()
		fetchCharacters()
		fetchPlotlines()
		fetchSkills()
	}, [])
	
	
	//When first working on it, I passed down the set state functions; however, 
	//I realized that my components didn't need these functions, as they would be using json requests.
  return (
    <>
	<h1>Character Manager App</h1>
	<main id="flex-container">
          <FactionList factionLoading={factionLoading} factions={factions} characters={characters}
		  fetchFactions={fetchFactions} fetchCharacters={fetchCharacters} />
		  
          <CharacterList characterLoading={characterLoading} setCharacterLoading={setCharacterLoading} characters={characters}
		  factions={factions} plotlines={plotlines} skills={skills}
		  fetchFactions={fetchFactions} fetchCharacters={fetchCharacters} fetchPlotlines={fetchPlotlines} fetchSkills={fetchSkills} />
		  
		  <PlotlineList plotlineLoading={plotlineLoading} plotlines={plotlines} characters={characters}
		  fetchCharacters={fetchCharacters} fetchPlotlines={fetchPlotlines} />

	</main>
	<footer className="button-holder">
	<button type="button" id="back-to-top"><a href="#top">^ Back to Top ^</a></button>
	</footer>
	</>
  )
}

export default App;
