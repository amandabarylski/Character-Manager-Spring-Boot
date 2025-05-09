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
- GET: all rows from each table, by id for all but skill, and by skill for character
- POST: faction, character, and plotline
- PUT: full update on character, partial update on plotline to toggle between active and inactive
- DELETE: faction and character

Since there was time, the following addition was impelemented:
- a frontend using React and custom CSS