import { CharacterInfo, Skill } from '../types';
import { ChangeEvent, useState } from 'react';

interface SearchBarProps {
	skills: Skill[]
	fetchCharactersBySkill: (skillName: string) => void
	setFilteredList: (filteredList: CharacterInfo[]) => void
}


function SearchBar({ skills, fetchCharactersBySkill, setFilteredList } : SearchBarProps) {
	
	//I use the name selected rather than formValues as there is only one value on this form.
	//However, I still kept it as a form in order to make use of handleChange and handleSubmit.
	const[selected, setSelected] = useState<string>("")
	
	//As the default for selected is an empty string, which I did not want to pass to my fetch request,
	//I had to handle it here, effectively causing a search by nothing which clears the filtered list.
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		selected === "" ? setFilteredList([]) : fetchCharactersBySkill(selected)
	}
	
	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelected(event.target.value)
	}
	
	return (
		<div className="detail-container">
			<form className="detail-section" onSubmit={handleSubmit}>
				<label htmlFor="skill-select">Search By Skill:</label>
				<select name="skill-select" id="skill-select" onChange={handleChange}>
					<option value=""></option>
					{skills.map((skill) => (
						<option key={skill.skillId} value={skill.skillName}>{skill.skillName}</option>
					))}
				</select>
				<button type="submit" className="submit-button">Search</button>
			</form>
			<section className="detail-buttons">
				<button type ="button" className="cancel-button" onClick={()=> setFilteredList([])}>Cancel Search</button>
			</section>
		</div>
	)
	
}

export default SearchBar