*SPRING BOOT FINAL PROJECT*

GOAL: to create a REST API with at least three tables, each of which has at least one CRUD operation and at least one of which has all four.
TIMEFRAME: three weeks

ENTITIES:
- faction
- character
- skill
- plotline

The character table will be the center of the API with relationships to all other tables:
- many-to-one with faction (many characters, one faction) with cascade on faction deletion.
- many-to-many with both skill and plotline

CRUD OPERATIONS:
- GET: all rows from each table, by id for all but skill, by faction, skill, or plotline for character
- POST: faction, character, and plotline
- PUT: full update on character, partial update on plotline
- DELETE: faction and character

Other than the backend requirements, if there is time, the following will also be implemented:
- images on characters, either as a field in the entity or as a separate entity with a one-to-one relationship (intending to implement but will remove if necessary)
- frontend via React and custom CSS