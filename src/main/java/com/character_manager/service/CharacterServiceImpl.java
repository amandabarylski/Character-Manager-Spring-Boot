package com.character_manager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.character_manager.entity.CharacterInfo;
import com.character_manager.entity.Faction;
import com.character_manager.entity.Plotline;
import com.character_manager.entity.Skill;
import com.character_manager.exception.ResourceNotFoundException;
import com.character_manager.repository.CharacterRepository;
import com.character_manager.repository.FactionRepository;
import com.character_manager.repository.PlotlineRepository;
import com.character_manager.repository.SkillRepository;

@Service
public class CharacterServiceImpl implements CharacterService{
	//I referred to my DAO layer as repositories as that is how my instructor did it in class.
	//I also followed what he did with a service interface that this service class then implements.

	@Autowired
	CharacterRepository characterRepository;
	
	@Autowired
	FactionRepository factionRepository;
	
	@Autowired
	SkillRepository skillRepository;
	
	@Autowired
	PlotlineRepository plotlineRepository;

	//Get methods
	//For the getAll methods I looped through all of the objects to remove the contained lists.
	//After testing I had to go through additional steps to prevent recursion in findById methods and in the character lists.
	
	@Override
	public List<Faction> getAllFactions() {
		List<Faction> factions = factionRepository.findAll();
		for(Faction faction : factions) {
			faction.getCharacters().clear();
		}
		return factions;
	}

	@Override
	public Faction getFactionById(int factionId) {
		Faction faction = factionRepository.findById(factionId).orElseThrow(() -> new ResourceNotFoundException("Faction", "Id", factionId));
		for(CharacterInfo character : faction.getCharacters()) {
			character.setFaction(null);
			character.getSkills().clear();
			character.getPlotlines().clear();
		}
		return faction;
	}

	@Override
	public List<Skill> getAllSkills() {
		List<Skill> skills = skillRepository.findAll();
		for(Skill skill : skills) {
			skill.getCharacters().clear();
		}
		return skills;
	}

	@Override
	public List<Plotline> getAllPlotlines() {
		List<Plotline> plotlines = plotlineRepository.findAll();
		for(Plotline plotline : plotlines) {
			plotline.getCharacters().clear();
		}
		return plotlines;
	}

	@Override
	public Plotline getPlotlineById(int plotlineId) {
		Plotline plotline = plotlineRepository.findById(plotlineId).orElseThrow(() -> new ResourceNotFoundException("Plotline", "Id", plotlineId));
		for(CharacterInfo character : plotline.getCharacters()) {
			character.getFaction().setDescription(null);
			character.getFaction().getCharacters().clear();
			character.getSkills().clear();
			character.getPlotlines().clear();
		}
		return plotline;
	}

	@Override
	public List<CharacterInfo> getAllCharacters() {
		List<CharacterInfo> characters = characterRepository.findAll();
		for(CharacterInfo character : characters) {
			character.getSkills().clear();
			character.getPlotlines().clear();
			character.getFaction().getCharacters().clear();
			character.getFaction().setDescription(null);
		}
		return characters;
	}

	@Override
	public CharacterInfo getCharacterById(int characterId) {
		CharacterInfo character = characterRepository.findById(characterId)
				.orElseThrow(() -> new ResourceNotFoundException("Character", "Id", characterId));
		character.getFaction().getCharacters().clear();
		character.getFaction().setDescription(null);
		for(Skill skill : character.getSkills()) {
			skill.getCharacters().clear();
		}
		for(Plotline plotline : character.getPlotlines()) {
			plotline.setDescription(null);
			plotline.setDuration(null);
			plotline.getCharacters().clear();
		}
		return character;
	}

	//As the simplified character lists for the plotlines and factions were included in their getById methods,
	//but skills doesn't have a findById, it was the only one that needed to keep the specific character based method.
	@Override
	public List<CharacterInfo> getCharactersBySkill(String skillName) {
		Skill skill = skillRepository.findBySkillName(skillName).orElseThrow(() -> new ResourceNotFoundException("Skill", "name", skillName));
		List<CharacterInfo> skillCharacters = skill.getCharacters();
		for(CharacterInfo character : skillCharacters) {
			character.getSkills().clear();
			character.getPlotlines().clear();
			character.getFaction().getCharacters().clear();
			character.getFaction().setDescription(null);
		}
		return skillCharacters;
	}

	
	
	
	//Post methods
	
	@Override
	public Faction addFaction(Faction faction) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CharacterInfo addCharacter(CharacterInfo character) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Plotline addPlotline(Plotline plotline) {
		// TODO Auto-generated method stub
		return null;
	}

	
	
	
	//Put methods
	
	@Override
	public CharacterInfo updateCharacter(CharacterInfo character, int characterId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Plotline updatePlotline(int plotlineId) {
		// TODO Auto-generated method stub
		return null;
	}

	
	
	
	//Delete methods
	
	@Override
	public void deleteFaction(int factionId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteCharacter(int characterId) {
		// TODO Auto-generated method stub
		
	}
	
}
