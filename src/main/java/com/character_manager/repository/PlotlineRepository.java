package com.character_manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.character_manager.entity.Plotline;

public interface PlotlineRepository extends JpaRepository<Plotline, Integer> {

}
