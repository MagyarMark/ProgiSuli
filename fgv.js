function osszead() {
    const szam = parseFloat(document.getElementById('szam').value);
    const szam1 = parseFloat(document.getElementById('szam1').value);
    const eredmeny = szam + szam1;
    document.getElementById('eredmeny').textContent = eredmeny;
}

function kivon() {
    const szam = parseFloat(document.getElementById('szam').value);
    const szam1 = parseFloat(document.getElementById('szam1').value);
    const eredmeny = szam - szam1;
    document.getElementById('eredmeny').textContent = eredmeny;
}

function Rm(){
    const RandomSzam = Math.floor(Math.random() * 100) + 1;
    document.getElementById('RandomSzam').textContent = RandomSzam;
}

function RandomSzin() {
    const szinek = ['red', 'blue', 'green', 'purple', 'orange'];
    const veletlenszin = szinek[Math.floor(Math.random() * szinek.length)];
    document.getElementById('szoveg').style.color = veletlenszin;
}