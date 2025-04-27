package com.character_manager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.character_manager.entity.CharacterInfo;
import com.character_manager.entity.Faction;
import com.character_manager.entity.Plotline;
import com.character_manager.entity.Skill;
import com.character_manager.service.CharacterServiceImpl;

@RestController
@RequestMapping("/character_manager")
public class CharacterController {
	
	@Autowired
	CharacterServiceImpl characterService;

	//When returning single objects, I opted to use ResponseEntities.
	//Get methods
	
	@GetMapping("/faction")
	public List<Faction> getAllFactions() {
		return characterService.getAllFactions();
	}
	
	@GetMapping("/faction/{factionId}")
	public ResponseEntity<Faction> getFactionById(@PathVariable int factionId) {
		return new ResponseEntity<Faction>(characterService.getFactionById(factionId), HttpStatus.OK);
	}
	
	@GetMapping("/skill")
	public List<Skill> getAllSkills() {
		return characterService.getAllSkills();
	}
	
	@GetMapping("/plotline")
	public List<Plotline> getAllPlotlines() {
		return characterService.getAllPlotlines();
	}
	
	@GetMapping("/plotline/{plotlineId}")
	public ResponseEntity<Plotline> getPlotlineById(@PathVariable int plotlineId) {
		return new ResponseEntity<Plotline>(characterService.getPlotlineById(plotlineId), HttpStatus.OK);
	}
	
	@GetMapping("/character_table")
	public List<CharacterInfo> getAllCharacters() {
		return characterService.getAllCharacters();
	}
	
	@GetMapping("/character_table/{characterId}")
	public ResponseEntity<CharacterInfo> getCharacterById(@PathVariable int characterId) {
		return new ResponseEntity<CharacterInfo>(characterService.getCharacterById(characterId), HttpStatus.OK);
	}
	
	@GetMapping("/skill/{skillName}/character_table")
	public List<CharacterInfo> getCharactersBySkill(@PathVariable String skillName) {
		return characterService.getCharactersBySkill(skillName);
	}
	
}
