package com.character_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.character_manager.repository.CharacterRepository;
import com.character_manager.repository.FactionRepository;
import com.character_manager.repository.PlotlineRepository;
import com.character_manager.repository.SkillRepository;

@Service
public class CharacterService {
	//I referred to my DAO layer as repositories as that is how my instructor did it in class.

	@Autowired
	CharacterRepository characterRepository;
	
	@Autowired
	FactionRepository factionRepository;
	
	@Autowired
	SkillRepository skillRepository;
	
	@Autowired
	PlotlineRepository plotlineRepository;
	
}
