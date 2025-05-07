//As my fetch requests are set up to ensure that there will not be recursion, I simply based my interfaces on my back end entities.

export interface CharacterInfo {
	characterId: number,
	characterName: string,
	race?: string,
	gender?: string,
	description?: string,
	faction: Faction,
	skills: Skill[],
	plotlines: Plotline[]
}

export interface CharacterModel {
	characterName: string,
	race?: string,
	gender?: string,
	description?: string,
	factionId: number,
	skills: string[],
	plotlines: number[]
}

export interface Faction {
	factionId: number,
	factionName: string,
	description?: string,
	accentColor?: string,
	characters: CharacterInfo[]
}

export interface Skill {
	skillId: number,
	skillName: string,
	characters: CharacterInfo[]
}

export interface Plotline {
	plotlineId: number,
	plotlineName: string,
	description?: string,
	duration?: string,
	active: boolean,
	characters: CharacterInfo[]
}

export interface PlotlineModel {
	plotlineName: string,
	description?: string,
	duration?: string,
	active: boolean,
	characters: number[]
}