package com.character_manager.controller.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CharacterModel {

	private String characterName;
	private String race;
	private String gender;
	private String description;
	
	private int factionId;
	private List<Integer> plotlines = new ArrayList<>();
	private List<String> skills = new ArrayList<>();
	
}
