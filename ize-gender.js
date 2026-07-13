document.body.style.border = "5px solid red"; //leave for test it loads until prod
const listy = ["example", "domain"];

const par = document.createElement("mark"); // dont use mark use smt else for accessbility ig
par.textContent = "meopw";

document.body.prepend(par);
// todo: find
// todo: mark/highlight