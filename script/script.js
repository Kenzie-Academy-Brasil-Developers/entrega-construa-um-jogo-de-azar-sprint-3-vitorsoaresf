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

// FUNCAO QUE INSERE ANIMAL NO TABULEIRO HORIZONTALMENTE
const insertBeastLine = (beast, id) => {
    let arr = [];

    for (let i = 0; i < beast.length; i++, id++) {
        const element = document.getElementById(`${id}`);
        arr.push(Number.parseInt(element.getAttribute('id')));
        element.innerText = beast[i];
    }

    return arr;
}

// FUNCAO QUE INSERE ANIMAL NO TABULEIRO VERTICALMENTE
const insertBeastColumn = (beast, id) => {
    let arr = [];
    console.log('id : '+id+' beast:'+beast)
    let endPosition = id + (beast.length * 10);
    for (let i = 0; id < endPosition; i++, id+=10) {
        const element = document.getElementById(`${id}`);
        arr.push(Number.parseInt(element.getAttribute('id')));
        element.innerText = beast[i];
    }
    return arr;
}


// FUNCAO QUE RETORNA UM ID PARA QUE A PALAVRA SEJA A PARTIR DELE INSERIDA (HORIZONTAL)
const randomPositionLine = (word, arrTdId) => {
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

// FUNCAO QUE RETORNA UM ID PARA QUE A PALAVRA SEJA A PARTIR DELE INSERIDA (VERTICAL)
const randomPositionColumn = (word, arrTdId) => {
    let arr = [];

    // DETERMINANDO UMA POSICAO QUE CAIBA A STRING E NAO A QUEBRE EM OUTRA LINHA
    let strWidth = Math.floor(Math.random() * ((11 - word.length) - 1) + 1);
    let positionSelect = 0;

    //PREENCHENDO COM POSSIVEIS LOCALIZACOES QUE A STRING PODE OCUPAR
    for (let i = 0; i <= 100 - (word.length * 10); i += 10) {
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

const removeIdsColumn = (digit, arrTdId) => {
    for (let i = 0; i < 100; i+=10, digit+=10) {
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

    // ZERA AS VARIAVEIS DE MANIPULACAO DO JOGO
    elementsPositionsWin = [];
    discoverNumber = 0;

    // DEFINICAO DEVARIAVEIS--------------------------------------------------------------------------------

    // ARRAY DE ANIMAIS
    const zoo = ['abelha', 'andorinha', 'anta', 'boi', 'besouro', 'baleia', 'borboleta', 'cachorro', 'carneiro', 'enguia', 'ema', 'elefante', 'formiga', 'foca', 'flamingo', 'gato', 'golfinho', 'guaxinim', 'hiena', 'tartaruga']

    removeChildrensTable();

    // CRIANDO A TABELA
    createTable();

    // CRIANDO ARRAY COM TODOS ID'S  DOS ELEMENTOS <td>
    const arrTd = document.getElementsByTagName('td');
    let arrTdId = returnAllTD(arrTd);

    // SELECIONA O ANIMAL E A REMOVE PARA NAO HAVER DUPLICACAO DE ANIMAIS NO TABULEIRO
    const beast1 = zoo.splice(Math.floor(Math.random() * zoo.length), 1).toString();
    const beast2 = zoo.splice(Math.floor(Math.random() * zoo.length), 1).toString();
    const beast3 = zoo.splice(Math.floor(Math.random() * zoo.length), 1).toString();

    // IRA DETERMINARA QUAL TIPO DE ORGAZINAZACAO SE ENCONTRARAO AS PALAVRAS: HORIZONTAL, VERTICAL OU DIAGONAL
    let typeOfOrganization = Math.floor(Math.random() * (3 - 1) + 1);

    // ARMAZENA O GRUPO <td> QUE CONTEM O ELEMENTO
    let arrGroup = [];

    // ORGANIZACAO DAS PALAVRAS NA HORIZONTAL
    if (typeOfOrganization === 1) {
        // BEAST 1---------------------------------------------------------------------------------------------
        let selectId1 = randomPositionLine(beast1, arrTdId);
        let digit = Number.parseInt(selectId1.toString()[0]) * 10;
        arrTdId = removeIdsLine(digit, arrTdId);


        arrGroup = insertBeastLine(beast1, selectId1);

        elementsPositionsWin.push(arrGroup);
        arrGroup = [];

        // BEAST 2---------------------------------------------------------------------------------------------
        let selectId2 = randomPositionLine(beast2, arrTdId);
        digit = Number.parseInt(selectId2.toString()[0]) * 10;
        arrTdId = removeIdsLine(digit, arrTdId);

        arrGroup = insertBeastLine(beast2, selectId2);

        elementsPositionsWin.push(arrGroup);
        arrGroup = [];

        // BEAST 3---------------------------------------------------------------------------------------------
        let selectId3 = randomPositionLine(beast3, arrTdId);
        digit = Number.parseInt(selectId3.toString()[0]) * 10;
        arrTdId = removeIdsLine(digit, arrTdId);

        arrGroup = insertBeastLine(beast3, selectId3);

        elementsPositionsWin.push(arrGroup);
        arrGroup = [];
    }
    // ORGANIZACAO DAS PALAVRAS NA VERTICAL
    else if (typeOfOrganization === 2) {
        // BEAST 1---------------------------------------------------------------------------------------------
        let selectId1 = randomPositionColumn(beast1, arrTdId);
        arrTdId = removeIdsColumn(selectId1, arrTdId);
        arrGroup = insertBeastColumn(beast1, selectId1);

        elementsPositionsWin.push(arrGroup);
        arrGroup = [];

        // BEAST 2---------------------------------------------------------------------------------------------
        let selectId2 = randomPositionColumn(beast2, arrTdId);
        arrTdId = removeIdsColumn(selectId2, arrTdId);
        arrGroup = insertBeastColumn(beast2, selectId2);

        elementsPositionsWin.push(arrGroup);
        arrGroup = [];

        // BEAST 3---------------------------------------------------------------------------------------------
        let selectId3 = randomPositionColumn(beast3, arrTdId);
        arrTdId = removeIdsColumn(selectId3, arrTdId);
        arrGroup = insertBeastColumn(beast3, selectId3);

        elementsPositionsWin.push(arrGroup);
        arrGroup = [];
    }
    // ORGANIZACAO DAS PALAVRAS NA DIAGONAL
    else {
        
    }

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

    // INSERINDO O EVENTO NAS <td> DE VITÓRIA---------------------------------------------------------------
    for (let z = 0; z < elementsPositionsWin.length; z++) {
        let arrAux = elementsPositionsWin[z];
        for (let i = 0; i < arrAux.length; i++) {
            const element = document.getElementById(arrAux[i]);
            element.addEventListener('click', youFind)
        }

    }
}

newGame();

