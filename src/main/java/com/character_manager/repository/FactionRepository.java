package com.character_manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.character_manager.entity.Faction;

public interface FactionRepository extends JpaRepository<Faction, Integer> {

}
