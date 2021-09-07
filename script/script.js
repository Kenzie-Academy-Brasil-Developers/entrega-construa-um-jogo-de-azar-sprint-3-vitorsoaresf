// FUNCAO QUE RETORNA UM ID PARA QUE A PALAVRA SEJA A PARTIR DELE INSERIDA
const randomPosition = (word) => {
    let arr = [];

    // DETERMINANDO UMA POSICAO QUE CAIBA A STRING E NAO A QUEBRE EM OUTRA LINHA
    let strWidth = Math.floor(Math.random() * ((11 - word.length) - 1) + 1);
    let positionSelect = 0;

    //PREENCHENDO COM POSSIVEIS LOCALIZACOES QUE A STRING PODE OCUPAR
    for (let i = 0; i < 100; i += 10) {
        if (arrTdId.indexOf(i + strWidth) !== -1) {
            arr.push(i + strWidth);
        }
    }
    console.log(arr)

    // LENDO QUAL POSICAO A STRING IRA INICIALMENTE OCUPAR. EH SOMENTE A PRIMEIRA POSICAO QUE
    // QUE SE INICIA.
    positionSelect = Math.floor(Math.random() * arr.length);
    console.log('position ' + positionSelect)

    // RETORNA O ID SELECIONADO
    return arr[positionSelect];
}

//FUNCAO CRIA A TABELA DA APP
const createTable = () => {
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

}

// FUNCAO QUE GARANTE QUE ELEMENTOS NAO OCUPEM A MESMA LINHA E POR ISSO RETIRA TODOS
// OS ID'S (arrTdId) DAS <td> DA LINHA
const removeIdsLine = (digit) => {
    for (let i = 0; i < 10; i++, digit++) {
        arrTdId.splice(arrTdId.indexOf(digit), 1)
    }
}

// ARRAY DE ANIMAIS
const zoo = ['abelha', 'andorinha', 'anta', 'boi', 'babuíno', 'baleia', 'cachorro', 'camaleão', 'dromedário', 'dragão', 'ema', 'elefante', 'formiga', 'foca', 'flamingo', 'gato', 'golfinho', 'guaxinim', 'hipopótamo', 'hiena']

// CRIANDO A TABELA
createTable();

// CRIANDO ARRAY DOS ID'S  DOS ELEMENTOS <td>
const arrTd = document.getElementsByTagName('td');
const arrTdId = [];
for (let i = 0; i < arrTd.length; i++) {
    arrTdId.push(Number.parseInt(arrTd[i].getAttribute('id')));
}

// SELECIONA A PALAVRA E A REMOVE PARA NAO HAVER DUPLICACAO DE PALAVRAS NO TABULEIRO
const beast1 = zoo.splice(Math.floor(Math.random() * zoo.length), 1).toString();
const beast2 = zoo.splice(Math.floor(Math.random() * zoo.length), 1).toString();
const beast3 = zoo.splice(Math.floor(Math.random() * zoo.length), 1).toString();


let selectId1 = randomPosition(beast1);
let digit = Number.parseInt(selectId1.toString()[0]) * 10;
removeIdsLine(digit);


for (let i = 0; i < beast1.length; i++, selectId1++) {
    const element = document.getElementById(`${selectId1}`);
    element.innerText = beast1[i];
}

let selectId2 = randomPosition(beast2);
digit = Number.parseInt(selectId2.toString()[0]) * 10;
removeIdsLine(digit);

for (let i = 0; i < beast2.length; i++, selectId2++) {
    const element = document.getElementById(`${selectId2}`);
    element.innerText = beast2[i];
}


let selectId3 = randomPosition(beast3);
digit = Number.parseInt(selectId3.toString()[0]) * 10;
removeIdsLine(digit);

for (let i = 0; i < beast3.length; i++, selectId3++) {
    const element = document.getElementById(`${selectId3}`);
    element.innerText = beast3[i];
}
