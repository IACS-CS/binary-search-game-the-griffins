import "./style.css";
import { TextInterface } from "text-interface";
let app = document.querySelector("#app");
var audio = new Audio("/candy.mp3")
audio.loop = true 
let ti = new TextInterface(app, " Family Guy Quiz");
let keepplaying=true 
while(keepplaying){
let result = 0;
ti.output("I'll try to guess which family guy character you are (hit return to begin)");
await ti.readText();
audio.play()
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
ti.clear();
ti.output("Play again?");
keepplaying=await ti.readYesOrNo();
ti.loop;}