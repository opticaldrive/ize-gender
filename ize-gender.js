//// ok i genuinely hate js so much pardon the code

// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Modify_a_web_page




// const colours = {
//     "blue":rgba(85, 205, 252, 1)
//     "pink": rgba(247, 168, 184, 1)
// }

// CSV loading code
const csv_path = browser.runtime.getURL("assets/data.csv")

fetch(csv_path)
    .then(res=>res.text())
    .then(text=>{
        const lines = text.split("\n");
        const listy = lines.map(line => line.trim()).filter(line => line.length > 0);
        
        const dict = {};
        // gotta skip the header #1 bc its the header /no data
        for (let i = 1; i < listy.length; i++) {
            const columns = listy[i].split(",");
            
            const nameKey = columns[0].trim();
            
            dict[nameKey] = {
                gender: columns[1].trim(),
                score: parseFloat(columns[2].trim())
            };
        }

        console.log(dict);
    });
// debug listy



const unsoredlisty = ["example", "domain", "documentation", "test", "examples","orion", "power", "claude", "fable", "minecraft", "bananas", "homelab", "qwen", "who", "america", "joined", "robotics", "moonshine"];


const listy = unsoredlisty.sort((a,b)=>b.length-a.length); // sort by length so longer words are matched first thnks autocomplete

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
        const isMatch = listy.some(word => word.toLowerCase() === part.toLowerCase());
        
        if (isMatch) {
            const span = document.createElement("span");
            // Soft accessible blue highlight background
            span.style.backgroundColor = "rgba(85, 205, 252, 0.4)"; 
            // span.style.borderBottom = "2px solid #0056b3"; # i didnt want this smh gemini 
            span.textContent = part;
            fragment.appendChild(span);
        } else if (part) {
            fragment.appendChild(document.createTextNode(part));
        }
    });

    node.parentNode.replaceChild(fragment, node);

})
// todo: mark/highlight

