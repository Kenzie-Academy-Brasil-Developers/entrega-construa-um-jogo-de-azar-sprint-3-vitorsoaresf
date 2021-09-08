// CRIANDO ARRAY COM GRUPOS DE ID'S  DOS ELEMENTOS <td> EM QUE AS PALAVRAS SE ENCONTRAM
let elementsPositionsWin = []

// NUMERO QUE DETERMINARA A VITORIA
let discoverNumber = 0;


//FUNCAO CRIA A TABELA DA APP
const createTable = () => {
    const table = document.getElementById('table');
    let contId = 1;
    for (let i = 0; i < 10; i++) {
        const tr = document.createElement('tr');
        for (let z = 0; z < 10; z++) {
            const td = document.createElement('td');
            td.classList.add('td-style');
            td.setAttribute('id', contId);
            contId++;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

}

// FUNCAO QUE RETORNA UM ID PARA QUE A PALAVRA SEJA A PARTIR DELE INSERIDA
const randomPosition = (word, arrTdId) => {
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
    // LENDO QUAL POSICAO A STRING IRA INICIALMENTE OCUPAR. EH SOMENTE A PRIMEIRA POSICAO QUE
    // QUE SE INICIA.
    positionSelect = Math.floor(Math.random() * arr.length);

    // RETORNA O ID SELECIONADO
    return arr[positionSelect];
}

// FUNCAO QUE GARANTE QUE ELEMENTOS NAO OCUPEM A MESMA LINHA E POR ISSO RETIRA TODOS
// OS ID'S (arrTdId) DAS <td> DA LINHA
const removeIdsLine = (digit, arrTdId) => {
    for (let i = 0; i < 10; i++, digit++) {
        arrTdId.splice(arrTdId.indexOf(digit), 1)
    }
    return arrTdId;
}

//FUNCAO QUE ZERA A  TABELA TODAS AS VEZES QUE COMECAR O NOVO JOGO
const removeChildrensTable = () => {
    const app = document.getElementById('container');
    const tableApp = document.getElementById('table');
    tableApp.innerText = '';
    document.getElementById('bt-new').style.display = 'none';

}

//RETORNA TODAS AS ID'S TD
const returnAllTD = (arrTd) => {
    let arr = [];
    for (let i = 0; i < arrTd.length; i++) {
        arr.push(Number.parseInt(arrTd[i].getAttribute('id')));
    }
    return arr;
}

// FUNCAO QUE EXIBIRA ALGO QUANDO ACHAR A PALAVRA
const youFind = (event) => {
    const element = event.target;

    let dig = element.id[0];
    let groupId = [];

    // SELECIONANDO O GRUPO EM QUE FOI PEGO O EVENTO DE CLICK
    for (let i = 0; i < elementsPositionsWin.length; i++) {
        let arrAux = elementsPositionsWin[i];
        for (let z = 0; z < arrAux.length; z++) {
            if (arrAux.includes(Number.parseInt(element.id))) {
                groupId.push(arrAux[z]);
            }
        }
    }

    // PINTANDO O GRUPO
    for (let i = 0; i < groupId.length; i++) {
        const td = document.getElementById('' + groupId[i]);
        td.classList.add('td-style-win');
    }

    // DESABILITANDO O EVENTO DO GRUPO
    for (let i = 0; i < groupId.length; i++) {
        const td = document.getElementById('' + groupId[i]);
        td.removeEventListener('click', youFind, false);
    }


    discoverNumber++;
    if (discoverNumber === 3) {
        const button = document.getElementById('bt-new');
        button.style.display = 'block';
        button.addEventListener('click', newGame);
    }
}

const newGame = () => {
    elementsPositionsWin = [];
    discoverNumber = 0;

    // ARRAY DE ANIMAIS-------------------------------------------------------------------------------------
    const zoo = ['abelha', 'andorinha', 'anta', 'boi', 'besouro', 'baleia', 'borboleta', 'cachorro', 'carneiro', 'enguia', 'ema', 'elefante', 'formiga', 'foca', 'flamingo', 'gato', 'golfinho', 'guaxinim', 'hiena', 'tartaruga']

    removeChildrensTable();

    // CRIANDO A TABELA-------------------------------------------------------------------------------------
    createTable();

    // CRIANDO ARRAY COM TODOS ID'S  DOS ELEMENTOS <td>-----------------------------------------------------
    const arrTd = document.getElementsByTagName('td');
    let arrTdId = returnAllTD(arrTd);

    // SELECIONA O ANIMAL E A REMOVE PARA NAO HAVER DUPLICACAO DE ANIMAIS NO TABULEIRO
    const beast1 = zoo.splice(Math.floor(Math.random() * zoo.length), 1).toString();
    const beast2 = zoo.splice(Math.floor(Math.random() * zoo.length), 1).toString();
    const beast3 = zoo.splice(Math.floor(Math.random() * zoo.length), 1).toString();

    // let typeOfOrganization

    // ARMAZENA O GRUPO <td> QUE CONTEM O ELEMENTO----------------------------------------------------------
    let arrGroup = [];

    // BEAST 1----------------------------------------------------------------------------------------------
    let selectId1 = randomPosition(beast1, arrTdId);
    let digit = Number.parseInt(selectId1.toString()[0]) * 10;
    arrTdId = removeIdsLine(digit, arrTdId);


    for (let i = 0; i < beast1.length; i++, selectId1++) {
        const element = document.getElementById(`${selectId1}`);
        arrGroup.push(Number.parseInt(element.getAttribute('id')));
        element.innerText = beast1[i];
    }

    elementsPositionsWin.push(arrGroup);
    arrGroup = [];

    // BEAST 2----------------------------------------------------------------------------------------------
    let selectId2 = randomPosition(beast2, arrTdId);
    digit = Number.parseInt(selectId2.toString()[0]) * 10;
    arrTdId = removeIdsLine(digit, arrTdId);

    for (let i = 0; i < beast2.length; i++, selectId2++) {
        const element = document.getElementById(`${selectId2}`);
        arrGroup.push(Number.parseInt(element.getAttribute('id')));
        element.innerText = beast2[i];
    }

    elementsPositionsWin.push(arrGroup);
    arrGroup = [];

    // BEAST 3----------------------------------------------------------------------------------------------
    let selectId3 = randomPosition(beast3, arrTdId);
    digit = Number.parseInt(selectId3.toString()[0]) * 10;
    arrTdId = removeIdsLine(digit, arrTdId);

    for (let i = 0; i < beast3.length; i++, selectId3++) {
        const element = document.getElementById(`${selectId3}`);
        arrGroup.push(Number.parseInt(element.getAttribute('id')));
        element.innerText = beast3[i];
    }

    elementsPositionsWin.push(arrGroup);
    arrGroup = [];

    // INSERINDO OUTRAS LETRAS NO ESPACOS VAGOS-------------------------------------------------------------

    let arrCompleteTable = returnAllTD(arrTd);


    // CRIANDO VARIAVEL PARA PASSAR O IDS CONTIDOS EM CADA GRUPO DO ARRAY elementsPositionsWin
    let arrAllIdSelect = [];
    for (let i = 0; i < elementsPositionsWin.length; i++) {
        let arrAux = elementsPositionsWin[i];
        for (let z = 0; z < arrAux.length; z++) {
            arrAllIdSelect.push(arrAux[z]);
        }
    }

    // PREENCHENDO A TABELA COM LETRAS----------------------------------------------------------------------
    for (let i = 0; i < arrCompleteTable.length; i++) {
        if (!(arrAllIdSelect.includes(arrCompleteTable[i]))) {
            const element = document.getElementById(`${arrCompleteTable[i]}`);
            element.innerText = String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65));
        }
    }
    console.log(elementsPositionsWin)

    // INSERINDO O EVENTO NAS <td> DE VITÓRIA
    for (let z = 0; z < elementsPositionsWin.length; z++) {
        let arrAux = elementsPositionsWin[z];
        for (let i = 0; i < arrAux.length; i++) {
            const element = document.getElementById(arrAux[i]);
            element.addEventListener('click', youFind)
        }

    }
}

newGame();

