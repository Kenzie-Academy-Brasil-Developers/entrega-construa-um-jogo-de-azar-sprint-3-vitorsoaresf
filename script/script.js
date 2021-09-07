const words = ['abelha', 'andorinha', 'anta', 'boi', 'babuíno', 'baleia', 'cachorro', 'camaleão', 'dromedário', 'dragão', 'ema', 'elefante', 'formiga', 'foca', 'flamingo', 'gato', 'golfinho', 'guaxinim', 'hipopótamo', 'hiena']

// CRIANDO TABELA
const table = document.getElementById('table');
let contId = 1;
for (let i = 0; i < 10; i++) {
    const tr = document.createElement('tr');
    for (let z = 0; z < 10; z++) {
        const td = document.createElement('td');
        td.classList.add('style_td');
        td.setAttribute('id', contId);
        contId++;
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
let selectId = Math.floor(Math.random() * (words[0].length - 1) + 1);
console.log(selectId)
// const element = document.getElementById(`${selectId}`);
// element.innerText = wordSelect[i];
const wordSelect  = words[0];
for(let i = 0; i < wordSelect.length;i++,selectId++){
//     const selectId = Math.floor(Math.random() * (11 - 1) + 1);
//     console.log(selectId);
    const element = document.getElementById(`${selectId}`);
    element.innerText = wordSelect[i];
}

