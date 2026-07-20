//// ok i genuinely hate js so much pardon the code

// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Modify_a_web_page


// const colours = {
//     "blue":rgba(85, 205, 252, 1)
//     "pink": rgba(247, 168, 184, 1)
// }

async function main() {
const genderData = await browser.runtime.sendMessage({type: "getGenderData"});
const listy = Object.keys(genderData).sort((a,b)=>b.length-a.length); // sort by length so longer words are matched first thnks autocomplete

const par = document.createElement("span"); // dont use mark use smt else for accessbility ig



// LLM slop regex as i hate regex


// Escape special regex characters
const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Create a combined regex pattern with word boundaries
const pattern = listy.map(word => `\\b${escapeRegExp(word)}\\b`).join('|');
const regex = new RegExp(`(${pattern})`, 'gi');






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

const textnodes = [];
while (treewalker.nextNode()){
    textnodes.push(treewalker.currentNode)
}

// while (treewalker.nextNode()){
//     console.log(treewalker.currentNode)
//     treewalker.frage
// }


textnodes.forEach(node=>{
    console.log(node.nodeValue);
    const text = node.nodeValue;

    // llm vibeslop that tries to replaces stuff hmph

    // Skip if no match
    if (!regex.test(text)) return;
    
    regex.lastIndex = 0; // Reset regex state
    const fragment = document.createDocumentFragment();
    const parts = text.split(regex);

    parts.forEach(part => {
        // Check if the part matches a word in our list
        // const entry = listy.some(word => word.toLowerCase() === part.toLowerCase());
        const entry = genderData[part.toLowerCase()];
        
        
        if (entry) {
            const span = document.createElement("span");
            const opacity = entry.score / 100;
            if (entry.gender === "male"){
                span.style.backgroundColor = "rgba(85, 205, 252, ${opacity})";
            } else if (entry.gender ==="female"){
                span.style.backgroundColor = "rgba(247, 168, 184, ${opacity})";
            }
           
            span.textContent = part;
            fragment.appendChild(span);
        } else if (part) {
            fragment.appendChild(document.createTextNode(part));
        }
    });

    node.parentNode.replaceChild(fragment, node);

})
// todo: mark/highlight

}

main().catch(error => console.error("Could not process gender data:", error));
