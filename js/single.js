const loadOpponents = async () => {
    try {
        // Fetch the data from the JSON file
        const response = await fetch("../../data/ai.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Render all opponents dynamically
        const wrapper = document.getElementById("opponents");
        wrapper.innerHTML = data
            .map(
                opponent => `
                <button class="opponent" id="opponent-${opponent.id}"> 
                    <img src="../../img/naruto.jpeg">
                    <h3>${opponent.name}</h3>
                    <p>Difficulty: ${opponent.difficulty}</p>
                 
                </button>
            `
            )
            .join("");

        // Add onclick events to each button to navigate to the game page
        data.forEach(opponent => {
            const button = document.getElementById(`opponent-${opponent.id}`);
            button.onclick = () => {
                window.location = `./sgame.html?id=${opponent.id}`;
            };
        });
    } catch (error) {
        console.error("Error loading opponents data:", error);
    }
};

// Call the function to load all opponents
loadOpponents();
