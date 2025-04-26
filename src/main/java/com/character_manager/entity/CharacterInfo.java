package com.character_manager.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;


//I had to change the table name as calling it "character" was giving me problems when trying to create and populate the table.
//I then noticed that Eclipse was automatically taking other references to this class as the object version of char.
//To solve this I changed references to "Character" to "CharacterInfo" in all classes.
@Entity
@Data
@NoArgsConstructor
@Table(name = "character_table")
public class CharacterInfo {

//I worked on all four entities at once as they all connect to Character.
//For the many to many relationships I opted to use lists instead of sets so they would stay in the same order between requests.
//I consider Character to be the owner of the many to many relationships, so both join tables are here.
//I also added Lombok annotations to exclude all the relationships from EqualsAndHasCode and ToString.
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int characterId;
	
	@Column(nullable = false)
	private String characterName;
	
	private String race;
	private String gender;
	private String description;
	
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "faction_id")
	private Faction faction;
	
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	@ManyToMany(cascade = CascadeType.PERSIST)
	@JoinTable(name = "character_skill", joinColumns = @JoinColumn(name = "character_id"),
	inverseJoinColumns = @JoinColumn(name = "skill_id"))
	private List<Skill> skills = new ArrayList<>();
	
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	@ManyToMany(cascade = CascadeType.PERSIST)
	@JoinTable(name = "character_plotline", joinColumns = @JoinColumn(name = "character_id"),
	inverseJoinColumns = @JoinColumn(name = "plotline_id"))
	private List<Plotline> plotlines = new ArrayList<>();
	
}
