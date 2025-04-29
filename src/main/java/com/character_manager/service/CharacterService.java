package com.character_manager.service;

import java.util.List;

import com.character_manager.controller.model.CharacterModel;
import com.character_manager.controller.model.PlotlineModel;
import com.character_manager.entity.CharacterInfo;
import com.character_manager.entity.Faction;
import com.character_manager.entity.Plotline;
import com.character_manager.entity.Skill;

public interface CharacterService {

	//Get methods
	//I eventually removed getCharactersByFaction and getCharactersByPlotline,
	//as I was getting errors in my loops that were clearing fields
	//and there was no more or less character information in these methods as there were in the specific faction and plotline methods.
	
	public List<Faction> getAllFactions();
	
	public Faction getFactionById(int factionId);
	
	public List<Skill> getAllSkills();
	
	public List<Plotline> getAllPlotlines();
	
	public Plotline getPlotlineById(int plotlineId);
	
	public List<CharacterInfo> getAllCharacters();
	
	public CharacterInfo getCharacterById(int characterId);
	
	public List<CharacterInfo> getCharactersBySkill(String skillName);
	
	//Post methods
	
	public Faction addFaction(Faction faction);
	
	public CharacterInfo addCharacter(CharacterModel characterModel);
	
	public Plotline addPlotline(PlotlineModel plotlineModel);
	
	//Put methods
	
	public CharacterInfo updateCharacter(CharacterModel characterModel, int characterId);
	
	public Plotline updatePlotline(int plotlineId);
	
	//Delete methods
	
	public void deleteFaction(int factionId);
	
	public void deleteCharacter(int characterId);
	
}
