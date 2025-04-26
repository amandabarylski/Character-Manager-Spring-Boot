INSERT INTO faction (faction_name, description, accent_color) 
VALUES ("Vanguard", "An unofficial guild that takes on various jobs, seen by some as heroes and others as meddlers or vigilantes.", "purple");
INSERT INTO faction (faction_name, description, accent_color) 
VALUES ("Arrinian Royal Court", 
"The High King and his family and closest officials; not as united as they might seem, especially when it comes to the question of succession.", 
"orange");
INSERT INTO faction (faction_name, description, accent_color) 
VALUES ("Frontier Provinces", 
"Far from Arinn and often overlooked by those of the royal court, ambition and unrest are on the rise among provincial leadership.", "blue");
INSERT INTO faction (faction_name, description, accent_color) 
VALUES ("Elemental Cults of Tavirach", 
"Elemental guilds control the trade and education of Tavirach, maintaining their oppressive hold on the city state with a combination of faith and force.",
 "blue");
INSERT INTO faction (faction_name, description, accent_color) 
VALUES ("Tavirach Resistance", 
"A group of individuals within Tavirach who stand against the elemental cults, many of whom were sold or kidnapped into the guilds as children.",
 "red");


INSERT INTO plotline (plotline_name, description, duration, active) VALUES ("Arson in Arinn", 
"A noble's house and one of his portside storehouses have been set ablaze and Vanguard has been hired to investigate alongside the city guards.",
"Two days", false);
INSERT INTO plotline (plotline_name, description, duration, active) VALUES ("A Request From Gedharen", 
"The governor of Gedharen's steward arrives at Vanguard seeking help as his lord has fallen ill and the province is facing threats from within.",
"Three months", false);
INSERT INTO plotline (plotline_name, description, duration, active) VALUES ("City of Guilds", 
"A series of disappearances leads to the city state of Tavirach and its elemental guilds, but the city is not as glittering as it appears.",
"One month", true);


INSERT INTO skill (skill_name) VALUES ("Light- illumination");
INSERT INTO skill (skill_name) VALUES ("Light- illusion");
INSERT INTO skill (skill_name) VALUES ("Light- combat");
INSERT INTO skill (skill_name) VALUES ("Fire- ignition");
INSERT INTO skill (skill_name) VALUES ("Fire- suppression");
INSERT INTO skill (skill_name) VALUES ("Fire- combat");
INSERT INTO skill (skill_name) VALUES ("Water- dowsing");
INSERT INTO skill (skill_name) VALUES ("Water- hydromancy");
INSERT INTO skill (skill_name) VALUES ("Water- cryomancy");
INSERT INTO skill (skill_name) VALUES ("Wind- movement enhancement");
INSERT INTO skill (skill_name) VALUES ("Wind- combat");
INSERT INTO skill (skill_name) VALUES ("Earth- animal Speaking");
INSERT INTO skill (skill_name) VALUES ("Earth- language Speaking");
INSERT INTO skill (skill_name) VALUES ("Earth- Shifting");
INSERT INTO skill (skill_name) VALUES ("Earth- Green magic");
INSERT INTO skill (skill_name) VALUES ("Lightning- general use");
INSERT INTO skill (skill_name) VALUES ("Lightning- combat");
INSERT INTO skill (skill_name) VALUES ("Warding");
INSERT INTO skill (skill_name) VALUES ("Healing");
INSERT INTO skill (skill_name) VALUES ("Enchantment- temporary");
INSERT INTO skill (skill_name) VALUES ("Enchantment- runework");
INSERT INTO skill (skill_name) VALUES ("Enchantment- antimagic");
INSERT INTO skill (skill_name) VALUES ("Sorcery- blood magic");
INSERT INTO skill (skill_name) VALUES ("Sorcery- necromancy");
INSERT INTO skill (skill_name) VALUES ("Sorcery- summoning");
INSERT INTO skill (skill_name) VALUES ("Magical Theory");
INSERT INTO skill (skill_name) VALUES ("One-handed sword");
INSERT INTO skill (skill_name) VALUES ("Two-handed sword");
INSERT INTO skill (skill_name) VALUES ("Polearm");
INSERT INTO skill (skill_name) VALUES ("Archery");
INSERT INTO skill (skill_name) VALUES ("Hand-to-hand combat");
INSERT INTO skill (skill_name) VALUES ("Medicine");
INSERT INTO skill (skill_name) VALUES ("Wound care");
INSERT INTO skill (skill_name) VALUES ("Tracking");
INSERT INTO skill (skill_name) VALUES ("Music");
INSERT INTO skill (skill_name) VALUES ("Disguise");
INSERT INTO skill (skill_name) VALUES ("Diplomacy");
INSERT INTO skill (skill_name) VALUES ("Deception");
INSERT INTO skill (skill_name) VALUES ("Perception");
INSERT INTO skill (skill_name) VALUES ("Cooking");


INSERT INTO character_table (faction_id, character_name, race, gender, description)
VALUES (1, "Rosh", "Eldran", "Male", "One of the founders of Vanguard, retired from active adventuring in order to lead the Guild.");

INSERT INTO character_table (faction_id, character_name, race, gender, description)
VALUES (1, "Phoebe", "Aerien", "Female", "A rising leader among the guild, promising yet still unsure of her abilities and hard on herself.");

INSERT INTO character_table (faction_id, character_name, race, gender, description)
VALUES (3, "Kivles", "Selken", "Male", 
"Steward and successor to Lord Safrios, diligent and intelligent. A native of Gedharen, he understands what his people need.");

INSERT INTO character_table (faction_id, character_name, race, gender, description)
VALUES (2, "Osrew", "Mixed- Human", "Male", "The younger son of the High King, politically savvy and favored for the throne.");

INSERT INTO character_table (faction_id, character_name, race, gender, description)
VALUES (1, "Ila", "Eldran", "Female", "Owner of the Vanguard Inn and wife of Rosh, provides a home for many members of the Guild.");

INSERT INTO character_table (faction_id, character_name, race, gender, description)
VALUES (1, "Xaro", "Eldran", "Male", "Rosh and Ila's son. Reckless and overly eager to jump into danger, often arguing with his team members.");

INSERT INTO character_table (faction_id, character_name, race, gender, description)
VALUES (5, "Elian", "Elf", "Male", 
"Despite being raised by the Guilds since before he can remember, he began to uncover the truth and joined the resistance.");

INSERT INTO character_table (faction_id, character_name, race, gender, description)
VALUES (3, "Gevrie", "Mixed- Human", "Female", 
"Daughter of a minor noble, a combination of ambition, compassion, and intelligence have given her a desire to lead.");

INSERT INTO character_table (faction_id, character_name, race, gender, description)
VALUES (1, "Fin", "Aerien", "Male", 
"Brilliant physician, yet often in conflict with the Physicians' Guild due to the corruption he sees in its leadership.");

INSERT INTO character_table (faction_id, character_name, race, gender, description)
VALUES (1, "Meriele", "Mixed- Human", "Female", 
"Researching the use of scrying in communication, she remains at the inn to stay in contact with teams out on missions.");

INSERT INTO character_table (faction_id, character_name, race, gender, description)
VALUES (1, "Aties", "Mixed- Human", "Male", 
"The illegitimate son of a provincial noble, has lofty ambitions in the hopes that he can help inspire change.");

INSERT INTO character_table (faction_id, character_name, race, gender, description)
VALUES (5, "Vae", "Elf", "Female", "A young teen kidnapped by the Guilds as a child. Struggles to control her magical abilities.");

INSERT INTO character_table (faction_id, character_name, race, gender, description)
VALUES (4, "Ferenix", "Mixed- Human", "Male", 
"Leader of the Cult of the Eternal Flame, wearing a mask and a name passed down through multiple leaders of Tavirach.");

INSERT INTO character_table (faction_id, character_name, race, gender, description)
VALUES (2, "Basir", "Mixed- Human", "Male", 
"A noble and prominent member of the Merchants' Guild, he takes advantage of the rising unrest in the provinces to make deals.");

INSERT INTO character_table (faction_id, character_name, race, gender, description)
VALUES (2, "Brenward", "Mixed- Human", "Male", "High King of the Arinnian Empire, responsible for the Guild system.");

INSERT INTO character_table (faction_id, character_name, race, gender, description)
VALUES (1, "Daye", "Elf", "Female", "Left Tirba to join Vanguard due to the University of Feln's policies against female researchers.");

INSERT INTO character_table (faction_id, character_name, race, gender, description)
VALUES (1, "Tev", "Elf", "Male", "Grew up on the streets, he stole to survive until finding a home in Vanguard.");

INSERT INTO character_table (faction_id, character_name, race, gender, description)
VALUES (1, "Zaphyr", "Fairy", "Male", "Archmage of Arinn and a friend of Rosh, he aids in local missions.");

INSERT INTO character_table (faction_id, character_name, race, gender, description)
VALUES (2, "Adric", "Mixed- Human", "Male", 
"The older son of the High King, often out hunting with his noble friends. Prefers direct solutions even to the point of making conflicts worse.");

INSERT INTO character_table (faction_id, character_name, race, gender, description)
VALUES (3, "Safrios", "Mixed- Human", "Male", 
"Governor of Gedharen, his failing health pushed him to consider his impact on Gedharen and who best to lead the province.");