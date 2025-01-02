const retrieveData = async () => {
  const params = new URLSearchParams(window.location.search);
  const opponentId = params.get("id");
  
  if (!opponentId) {
        console.error("No ID found in URL");
        return;
    }
  try {
    const response = await fetch("../../data/ai.json");
    if (!response.ok) {
      throw new Error('failed fetch');
    }
    const data = await response.json();
    
    const opponent = data.find(item => item.id === parseInt(opponentId, 10));
    
    if (!opponent) {
            console.error("No opponent found with the given ID");
            return;
    }
    
    const head = document.getElementById("head");
    head.innerHTML = `<h2>Opponent Name: ${opponent.name}</h2>`;
 
  } catch (error) {
    console.error("error");
  }
}
let head = document.getElementById('head');
head.innerHTML =  `h2 id="head"></h2>`;

retrieveData();