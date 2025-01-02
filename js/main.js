// pages
let singlep = document.getElementById('playerone');
let multip = document.getElementById('playertwo');
let help = document.getElementById('help');

singlep.onclick = () => {
   window.location = "./pages/singleplayer/single.html";
}
multip.onclick = () => {
   window.location = "./pages/multiplayer/multi.html";
}
help.onclick = () => {
   window.location = "./pages/help/help.html";
}
