async function loadCSV() {
    const csvURL = browser.runtime.getURL("assets/data.csv");
    const response = await fetch(csvURL);

    if (!response.ok) {
        throw new Error(`Could not load CSV: ${response.status}`);
    }

    const lines = (await response.text()).trim().split(/\r?\n/);
    const data = {};

    // Start at 1 to skip the header.
    for (let i = 1; i < lines.length; i++) {
        const [name, gender, score] = lines[i].split(",");

        data[name.trim()] = {
            gender: gender.trim(),
            score: Number(score.trim())
        };
    }

    return data;
}

// This promise is created once when the extension's background context starts.
const genderData = loadCSV();

browser.runtime.onMessage.addListener(message => {
    if (message.type === "getGenderData") {
        return genderData;
    }
});
