/* grammarDb syntax key:
   ,   valid noun delimiter
   _   verb requires moveable noun to be present; usage removes from location and adds to inventory
   :   verb requires moveable noun to be in possession
   #   verb requires immovable noun to be present
   ^   "noun" is a direction
   +   follow-up preposition
   ()  valid follow-up options, which lead to description changes in inventory
   |   follow-up options delimiter
*/

const actionTokens = {
  "_" : "PM", // moveable noun must be present and action upon it removes from location and add to inventory
  ":" : "PO", // moveable noun must be in possession
  "#" : "PI", // immovable noun must be present
  "^" : "DI"  // "noun" is direction
}

const grammarDb = `get _cable,_plug,_phone,_key,_flashlight,_schedule,_binder,_flyer,_snacks,_book,_powerbank,_charger,_paperclip
open #door,:binder,:book,#cabinet
pick #lock
look :schedule,:binder,:flyer,:book,:powerbank:
go ^n,^s,^e,^w,^u,^d,^up,^down,^north,^south,^east,^west
activate #robot,:flashlight,:phone,#light
connect+to :plug(:cable|#outlet),:phone(:cable),:cable(:plug|:phone|:powerpack),:powerpack(:cable),#outlet(:plug)
use :phone,:flashlight,:paperclip,:machine,:key,:charger
eat :snacks
insert :key
n
s
e
w
u
d
north
south
east
west
up
down`;

const responseDb = `look+schedule It's a schedule of classes: Period 1A with Mr. Crier in Room 3011, Period 2A with XXXXX in Room XXXXX, Period 3A with XXXXX in Room XXXXX, Period 4A in Room XXXXX.
open+binder A schedule falls out and lands under a desk.
look+* It is a completely normal NOUN.`;

const locationDb = `baptiste	,2nbaptiste,,,,	This looks like Mr. Baptiste's room. Smells like hot sausage! There's also a flyer on the floor.	flyer
2nbaptiste	baptiste,,2nturn,,,	In the middle of the North hallway, a classroom door is left ajar. It faces north.
2nturn	,2stairs,,2nbaptiste,,	You're at a turn. One way leads to the stairs the other leads down a hallway.
2stairs	2nturn,2sturn,,,3stairs,1stairs	In between the North and South hallways are the stairs. They go up a floor and down a floor.
2sturn	2stairs,,,2smid,,	You're at a turn. The stairs leads North and the hallway leads West.
2smid	,2counselorturn,2sturn,,,	In the middle of the South hallway, the entrance to the counselor's suite faces South.
2scounselorturn	2smid,,2scounselorspreter,,,	Your inside the counselor's suite. Offices line up to the east.
2scounselorspreter	,spreter,,2scounselorturn,,	You're in front a counselor's office that proceeds South.
spreter	2scounselorspreter,,,,,	This looks like Mrs. Spreter's office. Why do I feel the need to complete my FAFSA? A USB cable lies on the floor.	cable
cafeteria	1nturnw,1frturne,,,,	You are in the cafeteria.
1frturne	cafeteria,,,1frturnw,,	You are at a turn in the hallway. The cafeteria is to the north and ROTC is to the west.
1frturnw	rotc,,1frturne,,,	You are standing outside the ROTC classroom.
rotc	changing,1frturnw,,,,	You are standing in the ROTC classroom. There is a flag on the wall. You see several small rooms along the north wall, including the Geedunk, Senior Chief’s office, and a changing room. Only the changing room door is open.	flyer
changing	,rotc,,,,	You are in a small changing room.	powerpack
1nturnw	,cafeteria,exit,,,	You are at a turn in the hallway. The cafeteria is to the south and a hallway leads off to the west.
exit	,1stair,,1nturnw,,	You are at the entrance to the school. The door is locked.
1stairs	exit,1libraryw,1downs,,2stairs,	You outside the central stairs. The choir room is across the foyer to the east. The entrance to the school is to the north and the library is to the south.
1downs	1blackbox,,,downs,,	You are outside the choir room. A hall goes north towards the black box theater.
downs	,,,1downs,,	You are in the choir room. The acoustics are amazing. There is a USB wall charger on one of the risers.	charger
1blackbox	blackbox,1downs,,,,	You are in the hall outside the black box theater, which is to the north. A hallway extends to the south towards the choir room.	robot
1libraryw	1stairs,,1librarye,library,,	You are outside the library, which is to your west. The stairs are just north of you and the entrance to the athletic wing is to the east.
1librarye	,1allen,,1libraryw,,	You are at the north end of the athletic wing. A hall to your west goes to the library and a hall to your south goes to the coaches’ offices.
library	,,1libaryw,,,	You are in the library.	book,key
1allen	1libarye,,allen,,,	You are in the hall outside Ms. Allen’s office.
allen	,,,1allen,,	You are in Ms. Allen’s office. You have never seen so many snacks.	food
crier	3ncrier,,,,,	You are in Ms. Crier’s room. There is a cabinet in the corner. On the floor is a large binder. 	binder,schedule,cabinet
3ncrier	,crier,3nturn,,,	You are standing in the middle of the hallway.
3nturn	,3stairs,,3ncrier,,	You are at a turn in the hallway where it goes east and south. 
3sturn	3stairs,,,3smide,,	You are at a turn in the hallway where it goes east and north. 
3stairs	3nturn,3sturn,,,,2stairs	You are standing outside the main staiway on the third floor.
3smide	,,3sturn,3smidw,,	You are standing in the right side of the hallway. 
3smidw	,,3smide,3srobinson,,	You are standing in the left side of the hallway.
robinson	,,3smide,,,	You are in Mr. Robinson’s room. There is a flashlight on the desk. There is a phone on the floor.	flashlight,phone
3srobinson	robinson,,3smidw,,,	You are standing in the hall outside of a classroom.`;

const directions = {
  n: "north",
  s: "south",
  e: "east",
  w: "west",
  u: "up",
  d: "down"
};
