// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Modify_a_web_page
document.body.style.border = "5px solid red"; //leave for test it loads until prod
const listy = ["example", "domain", "documentation", "test", "examples","Example Domain This domain is for use in documentation examples without needing permission. Avoid use in operations."];

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
// todo: find # use treewalker
const treewalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT,{
    acceptNode: function(node) {
        const parent = node.parentNode;
        if (!parent){return NodeFilter.FILTER_REJECT;}
        const tag = parent.tagName.toLowerCase();
        if (tag === 'script' || tag === 'style' || tag === 'textarea' || parent.isContentEditable) {
            return NodeFilter.FILTER_REJECT;
        } // ank filteres idk do these work?
        return NodeFilter.FILTER_ACCEPT;
      
    }
})

while (treewalker.nextNode()){
    console.log(treewalker.currentNode)
}
// todo: mark/highlight

