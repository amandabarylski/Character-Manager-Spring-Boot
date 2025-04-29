package com.character_manager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.character_manager.controller.model.CharacterModel;
import com.character_manager.controller.model.PlotlineModel;
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
	
	
	
	//Post methods
	
	@PostMapping("/faction")
	public ResponseEntity<Faction> addFaction(@RequestBody Faction faction) {
		return new ResponseEntity<Faction>(characterService.addFaction(faction), HttpStatus.CREATED);
	}

	//When dealing with the recursive created message, I decided to try separating the save method from the message.
	//The response entity returned is the created object, but with the modifications I made to prevent recursions in my get methods.
	@PostMapping("/character_table")
	public ResponseEntity<CharacterInfo> addCharacter(@RequestBody CharacterModel characterModel) {
		CharacterInfo character = characterService.addCharacter(characterModel);
		return new ResponseEntity<CharacterInfo>(characterService.getCharacterById(character.getCharacterId()), HttpStatus.CREATED);
	}
	
	@PostMapping("/plotline")
	public ResponseEntity<Plotline> addPlotline(@RequestBody PlotlineModel plotlineModel) {
		Plotline plotline = characterService.addPlotline(plotlineModel);
		return new ResponseEntity<Plotline>(characterService.getPlotlineById(plotline.getPlotlineId()), HttpStatus.CREATED);
	}
	
	
	
	//Put methods
	//To ensure that my response entities weren't recursive, I took the same precautions as I did in my recursive post methods.
	@PutMapping("/character_table/{characterId}")
	public ResponseEntity<CharacterInfo> updateCharacter(@PathVariable int characterId, @RequestBody CharacterModel characterModel) {
		CharacterInfo character = characterService.updateCharacter(characterModel, characterId);
		return new ResponseEntity<CharacterInfo>(characterService.getCharacterById(character.getCharacterId()), HttpStatus.OK);
	}
	
	@PutMapping("/plotline/{plotlineId}")
	public ResponseEntity<Plotline> updatePlotline(@PathVariable int plotlineId) {
		characterService.updatePlotline(plotlineId);
		return new ResponseEntity<Plotline>(characterService.getPlotlineById(plotlineId), HttpStatus.OK);
	}
	
	
	
	//Delete methods
	
	@DeleteMapping("/faction/{factionId}")
	public ResponseEntity<String> deleteFaction(@PathVariable int factionId) {
		characterService.deleteFaction(factionId);
		return new ResponseEntity<String>("Faction successfully deleted", HttpStatus.OK);
	}
	
	@DeleteMapping("/character_table/{characterId}")
	public ResponseEntity<String> deleteCharacter(@PathVariable int characterId) {
		characterService.deleteCharacter(characterId);
		return new ResponseEntity<String>("Character successfully deleted", HttpStatus.OK);
	}
	
}
