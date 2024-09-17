import "./style.css";
import { TextInterface } from "text-interface";





// Get the element with id="app"
let app = document.querySelector("#app");

// Create a new "Text Interface"

let ti = new TextInterface(app, " Family Guy Quiz");
let result = 0;
ti.output("I'll try to guess which family guy character you are (hit return to begin)");
await ti.readText();
ti.clear();
ti.output("Are you male!")

if (await ti.readYesOrNo()) {
  result = result +8
  ti.output("Freakin Sweet");
} else {
  ti.output("Shut up meg")
}

ti.output("are you part of the griffin family?")
if (await ti.readYesOrNo())
{result= result +4

ti.output ("Oh so you may have heard what the word is!");
}else {
ti.output("what are we?? some kinda family guy hehehehehe")}

ti.output("Do you have a husband or wife?")
if (await ti.readYesOrNo()){
  result = result +2 
  ti.output("Giggity");
} else {
  ti.output("How lonely")
}
ti.output("Are you smart?")
  if (await ti.readYesOrNo()){
result = result +1
ti.output("Im Kanye West")
  } else {
ti.output("hey Peter (Joe Voice)")
  }
  ti.clear();
let characters = [
  "Ellie",
  "tricia",
  "Donna",
  "Bonnie", 
  "Meg",
  "Greased up deaf guy (RARE GUESS)",
  "Babs",
  "Lois",
  "Cleveland jr",
  "Quagmire",
  "Cleveland",
  "Joe",
  "Chris",
  "Brian",
  "Peter",
  "Stewie"
];
let answer = characters[result];
ti.output(`You are ${answer}`)
//if you type ryan, tedddy or aditiya automatically do "Greased up deaf guy and end game"
//are you male or female 
//are currently part of the Griffin family?
//do you live with the browns?
//do you have a son
//do you get picked on a lot?
//are you an adult 
//is rich?
//are you a child
//do you have a
//are you an animal
// do you like icescream 
//were you famous?
//Do you have a husband or wife?
//are you smart?
//If you choose yes for male or female try to figure out a way to store the data while asking the other questions
//Avalable answers Peter Brian Stewie Joe Quagmire Cleaveland Chris cleaveland jr , Ladies Lois Ellie(dog) Meg Bonnie Trica Donna Babs 
// find a way to store the saved yes or no answer to question Like if char is male or female store it as 1 for yes or 0 for no in he end the binary should be like 10010 whatever = brian not sure how to do that yet.
// use if else statement for greased up deaf guy 