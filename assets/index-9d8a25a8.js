true&&(function polyfill() {
    const relList = document.createElement('link').relList;
    if (relList && relList.supports && relList.supports('modulepreload')) {
        return;
    }
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        processPreload(link);
    }
    new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type !== 'childList') {
                continue;
            }
            for (const node of mutation.addedNodes) {
                if (node.tagName === 'LINK' && node.rel === 'modulepreload')
                    processPreload(node);
            }
        }
    }).observe(document, { childList: true, subtree: true });
    function getFetchOpts(script) {
        const fetchOpts = {};
        if (script.integrity)
            fetchOpts.integrity = script.integrity;
        if (script.referrerpolicy)
            fetchOpts.referrerPolicy = script.referrerpolicy;
        if (script.crossorigin === 'use-credentials')
            fetchOpts.credentials = 'include';
        else if (script.crossorigin === 'anonymous')
            fetchOpts.credentials = 'omit';
        else
            fetchOpts.credentials = 'same-origin';
        return fetchOpts;
    }
    function processPreload(link) {
        if (link.ep)
            // ep marker = processed
            return;
        link.ep = true;
        // prepopulate the load record
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
    }
}());

const style = '';

(function(){try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".text-interface{padding-left:1em;padding-right:1em;width:100%;height:100%;--offwhite: #aaa;--grey: #888;--black: #222;--white: #fefefe;background-color:var(--black);color:var(--white);position:sticky;top:0;max-height:90vh;overflow-y:scroll;margin-right:auto;margin-left:auto;max-width:28em;min-width:20em;font-family:Roboto,sans-serif}.text-interface h2{position:sticky;top:0;background-color:var(--black);margin:0;padding-top:1em;padding-bottom:1em;border-bottom:1px dotted var(--grey)}.text-interface .input-wrap{border:1px dotted var(--grey);padding:1em;margin-top:1em;margin-bottom:1em;opacity:.1}.text-interface .input-wrap.active{opacity:1}.text-interface .placeholder{font-style:italic;color:var(--offwhite)}.output img{margin:1em;max-width:80%;animation:fade-in .5s}@keyframes fade-in{0%{opacity:0;transform:scale(0);transform-origin:top left}to{opacity:1;transform:scale(1)}}")),document.head.appendChild(t);}}catch(e){console.error("vite-plugin-css-injected-by-js",e);}})();
const o = ["yes", "yeah", "yep", "yup", "true", "t", "y", "aye", "yup"], l = ["no", "n", "false", "f", "nope", "nah"];
class r {
  constructor(t = document.body, e = "Text Interface") {
    this.listener = null, this.outputAnimationLength = 800, this.outputDelay = 300, this.shouldStealFocus = !1, this.outputQueue = [], this.div = document.createElement("div"), this.div.classList.add("text-interface"), t.appendChild(this.div), this.div.innerHTML = `
      <h2 class="ti-title">${e}</h2>
      <div class="output">
      </div>
      <div class="input-wrap">
          <div 
             class="input" 
             contenteditable 
             placeholder="Type here...">
          </div>
          <div class="placeholder">Type and hit return...</div>
      </div>
    `, this.inputWrap = this.div.querySelector(".input-wrap"), this.inputEl = this.div.querySelector(".input"), this.outputEl = this.div.querySelector(".output"), this.placeholderEl = this.div.querySelector(
      ".placeholder"
    ), this.setupInputListener(), this.shouldStealFocus && this.inputEl.focus();
  }
  setTitle(t) {
    this.div.querySelector(".ti-title").textContent = t;
  }
  clear() {
    this.outputEl.innerHTML = "";
  }
  async readChoice(t, e = "Choose one of the following:", i = "You must choose one of the options!") {
    this.output(e);
    for (let s = 0; s < t.length; s++)
      this.output(`${s + 1}. ${t[s]}`);
    let u = await this.readText();
    if (t.indexOf(u) > -1)
      return u;
    if (u = u.replace(/\D/g, ""), u != "") {
      let s = Number(u);
      if (!isNaN(s) && s <= t.length && s > 0)
        return t[Math.floor(s) - 1];
    }
    return this.output(i), await this.readChoice(t, e, i);
  }
  async readYesOrNo(t = "Say yes or no!") {
    let e = await this.readText();
    return e = e.toLowerCase(), e = e.replace(/\s+/, ""), o.indexOf(e) > -1 ? !0 : l.indexOf(e) > -1 ? !1 : (this.output(t), await this.readYesOrNo(t));
  }
  async readNumber(t = "Please type a number") {
    let e = await this.readText(), i = Number(e);
    return isNaN(i) ? (this.output(t), this.readNumber(t)) : i;
  }
  readText() {
    return this.shouldStealFocus && this.inputEl.focus(), this.inputWrap.classList.add("active"), this.inputWrap.scrollIntoView(), new Promise((t, e) => {
      this.listener = t;
    });
  }
  showElement(t) {
    this.outputting ? this.outputQueue.push(["element", t]) : (this.outputting = !0, this.outputEl.appendChild(t), t.scrollIntoView({ behavior: "smooth" }), setTimeout(() => {
      this.outputting = !1, this.doNextOutput();
    }, this.outputDelay));
  }
  showHTML(t) {
    let e = document.createElement("div");
    e.innerHTML = t, this.showElement(e);
  }
  showImage(t, e = "An image") {
    let i = document.createElement("img");
    i.setAttribute("src", t), i.setAttribute("alt", e), this.showElement(i);
  }
  output(t, e = !1) {
    if (t = "" + t, this.outputting)
      this.outputQueue.push(["text", t, e]);
    else {
      let i = document.createElement("div");
      if (i.classList.add("output"), e && i.classList.add("echo"), !this.outputAnimationLength || e)
        i.textContent = t;
      else {
        this.outputting = !0;
        let u = this.outputAnimationLength / t.length;
        const n = () => {
          i.textContent += t[0] || "", t = t.substring(1), t.length ? setTimeout(n, u) : (this.outputting = !1, this.doNextOutput());
        };
        setTimeout(n, this.outputDelay);
      }
      this.outputEl.appendChild(i), i.scrollIntoView({ behavior: "smooth" });
    }
  }
  doNextOutput() {
    if (this.outputQueue.length) {
      let t = this.outputQueue[0];
      this.outputQueue = this.outputQueue.slice(1);
      let e = t[0], i = t.slice(1);
      e == "text" ? this.output(...i) : this.showElement(...i);
    }
  }
  setupInputListener() {
    this.inputEl.addEventListener("keypress", (t) => {
      if (t.code == "Enter") {
        let i = this.inputEl.textContent.replace(/\n$/, "");
        this.output(i, !0), this.listener && (this.listener(i), this.listener = null), this.inputWrap.classList.remove("active"), setTimeout(() => {
          this.inputEl.textContent = "";
        }, 1);
      }
    }), this.placeholderEl.addEventListener("click", () => this.inputEl.focus());
  }
}

// Get the element with id="app"
let app = document.querySelector("#app");

// Create a new "Text Interface"

let ti = new r(app, " Family Guy Quiz");
let result = 0;
ti.output("I'll try to guess which family guy character you are (hit return to begin)");
await ti.readText();
ti.clear();
ti.output("Are you male!");

if (await ti.readYesOrNo()) {
  result = result +8;
  ti.output("Freakin Sweet");
} else {
  ti.output("Shut up meg");
}

ti.output("are you part of the griffin family?");
if (await ti.readYesOrNo())
{result= result +4;

ti.output ("Oh so you may have heard what the word is!");
}else {
ti.output("what are we?? some kinda family guy hehehehehe");}

ti.output("Do you have a husband or wife?");
if (await ti.readYesOrNo()){
  result = result +2; 
  ti.output("Giggity");
} else {
  ti.output("How lonely");
}
ti.output("Are you smart?");
  if (await ti.readYesOrNo()){
result = result +1;
ti.output("Im Kanye West");
  } else {
ti.output("hey Peter (Joe Voice)");
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
ti.output(`You are ${answer}`);
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
