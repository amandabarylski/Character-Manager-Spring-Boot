package com.character_manager.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
public class Plotline {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int plotlineId;
	
	@Column(nullable = false)
	private String plotlineName;
	
	private String description;
	private String duration;
	
	@Column(nullable = false)
	private boolean active;
	
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	@ManyToMany(mappedBy = "plotlines", cascade = CascadeType.PERSIST)
	private List<CharacterInfo> characters = new ArrayList<>();
	
}
