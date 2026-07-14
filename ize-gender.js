document.body.style.border = "5px solid red"; //leave for test it loads until prod
const listy = ["example", "domain"];

const par = document.createElement("span"); // dont use mark use smt else for accessbility ig
const texttest = "example domain domain example test test";

let texttoHighlight = texttest;

listy.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    texttoHighlight = texttoHighlight.replace(regex, `<span style="color: blue;">${word}</span>`)

});

// par.textContent = "meopw";

par.innerHTML = texttoHighlight;

document.body.prepend(par);
// todo: find
// todo: mark/highlight