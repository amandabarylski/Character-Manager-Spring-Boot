package com.character_manager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//Running the application for the first time created the tables.
//However, I do not have the settings in the project set to automatically populate the tables from the sql files.
//I separated my requests into two files to ensure that I had the ids correct (I assumed it would count up and it did, but wanted to be sure)
//To populate the tables I copied and pasted the contents of the sql files into MySQLWorkbench and then checked each table.
//As it had worked correctly, I then ran the application again to be sure I wasn't accidentally erasing the date (I was not).
@SpringBootApplication
public class CharacterManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CharacterManagerApplication.class, args);
	}

}
