package com.character_manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.character_manager.entity.Skill;

public interface SkillRepository extends JpaRepository<Skill, Integer> {

}
