package com.character_manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.character_manager.entity.CharacterInfo;

public interface CharacterRepository extends JpaRepository<CharacterInfo, Integer> {

}
