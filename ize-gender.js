// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Modify_a_web_page
document.body.style.border = "5px solid red"; //leave for test it loads until prod
const listy = ["example", "domain"];

const par = document.createElement("span"); // dont use mark use smt else for accessbility ig
const texttest = "example domain domain example test test";

// const colours = {"blue": }
let texttoHighlight = texttest;

listy.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    texttoHighlight = texttoHighlight.replace(regex, `<span style="background-color:  rgba(85, 205, 252, 0.5);">${word}</span>`)

});

// par.textContent = "meopw";

par.innerHTML = texttoHighlight;

document.body.prepend(par);
// todo: find
// todo: mark/highlight

