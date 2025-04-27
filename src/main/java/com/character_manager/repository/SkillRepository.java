package com.character_manager.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.character_manager.entity.Skill;
import com.character_manager.exception.ResourceNotFoundException;

public interface SkillRepository extends JpaRepository<Skill, Integer> {

	//I wanted to be able to search a skill by name since there were a lot of them.
	//On looking it up I found I could add a method to my repository in this way.
	public Optional<Skill> findBySkillName(String skillName) throws ResourceNotFoundException;
	
}
