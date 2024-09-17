import "./style.css";
import { TextInterface } from "text-interface";


let binary = 0;


// Get the element with id="app"
let app = document.querySelector("#app");

// Create a new "Text Interface"

let ti = new TextInterface(app, " Family Guy Quiz");
ti.output("I'll try to guess which family guy character you are (hit return to begin)");
await ti.readText();
ti.clear();
ti.output("Are you male!")
if (await ti.readYesOrNo()) {
  ti.output('Freakin sweet')
} else {
  ti.output("Shut up meg")
}
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
