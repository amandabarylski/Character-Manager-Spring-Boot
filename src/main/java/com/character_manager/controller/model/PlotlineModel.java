package com.character_manager.controller.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PlotlineModel {

	private String plotlineName;
	private String description;
	private String duration;
	private boolean active;
	
	private List<Integer> characters = new ArrayList<>();
	
}
