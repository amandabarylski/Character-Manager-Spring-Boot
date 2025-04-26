package com.character_manager.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
public class Faction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int factionId;
	
	@Column(nullable = false)
	private String factionName;
	
	private String description;
	private String accentColor;
	
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	@OneToMany(mappedBy = "faction", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<CharacterInfo> characters = new ArrayList<>();
	
}
