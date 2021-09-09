// CRIANDO ARRAY COM GRUPOS DE ID'S  DOS ELEMENTOS <td> EM QUE AS PALAVRAS SE ENCONTRAM
let elementsPositionsWin = []

// NUMERO QUE DETERMINARA A VITORIA 
let discoverNumber = 0;

// CRIANDO ARRAY COM TODOS ELEMENTOS HTML <td>
const arrTd = document.getElementsByTagName('td');

// GUARDARA SOMENTE ID'S DAS <td>
let arrTdId = [];

// VARIAVEIS COM AS POSICOES LIMITES DA TABELA
let limitsLeft = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91];
let limitsRight = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
let limitsTop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let limitsBotton = [91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
let limitsLeftTop = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let limitsRightBotton = [10, 20, 30, 40, 50, 60, 70, 80, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];


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
    let endPosition = id + (beast.length * 10);
    for (let i = 0; id < endPosition; i++, id += 10) {
        const element = document.getElementById(`${id}`);
        arr.push(Number.parseInt(element.getAttribute('id')));
        element.innerText = beast[i];
    }
    return arr;
}

// FUNCAO QUE INSERE ANIMAL NO TABULEIRO DIAGONALMENTE
const insertBeastDiagonal = (beast, id) => {
    let arr = [];

    for (let i = 0; i < beast.length; i++, id += 11) {
        const element = document.getElementById(`${id}`);
        arr.push(Number.parseInt(element.getAttribute('id')));
        element.innerText = beast[i];
    }

    return arr;
}

// FUNCAO QUE RETORNA UM ID PARA QUE A PALAVRA SEJA A PARTIR DELE INSERIDA (HORIZONTAL)
const randomPositionLine = (beast) => {
    let arr = [];

    // DETERMINANDO UMA POSICAO QUE CAIBA A STRING E NAO A QUEBRE EM OUTRA LINHA
    let strWidth = Math.floor(Math.random() * ((11 - beast.length) - 1) + 1);
    let positionSelect = 0;

    //PREENCHENDO COM POSSIVEIS LOCALIZACOES QUE A STRING PODE OCUPAR
    for (let i = 0; i < 100; i += 10) {
        if (arrTdId.includes(i + strWidth) === true) {
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
const randomPositionColumn = (beast) => {
    let arr = [];

    // DETERMINANDO UMA POSICAO QUE CAIBA A STRING E NAO A QUEBRE EM OUTRA COLUNA
    let strWidth = Math.floor(Math.random() * ((11 - beast.length) - 1) + 1);

    let positionSelect = 0;

    // ME GARANTE DE NAO DISPONIBILIZAR A MESMA COLUNA DUAS VEZES
    for (; arrTdId.indexOf(strWidth) === -1;) {
        strWidth = Math.floor(Math.random() * ((11 - beast.length) - 1) + 1);
    }

    //PREENCHENDO COM POSSIVEIS LOCALIZACOES QUE A STRING PODE OCUPAR
    for (let i = 0; i < 100 - (beast.length * 10); i += 10) {
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

// FUNCAO QUE RETORNA UM ID PARA QUE A PALAVRA SEJA A PARTIR DELE INSERIDA (DIAGONAL)
const randomPositionDiagonal = (beast) => {
    let arr = [];

    // DETERMINANDO UMA POSICAO QUE CAIBA A STRING E NAO A QUEBRE EM OUTRA DIAGONAL
    let strWidth = Math.floor(Math.random() * ((((111 - beast.length) - (beast.length * 10)) - 1) + 1));
    let positionSelect = 0;
    let endposition = ((111 - beast.length) - (beast.length * 10));

    // ME GARANTE DE NAO DISPONIBILIZAR A MESMA COLUNA DUAS VEZES
    for (; arrTdId.indexOf(strWidth) === -1;) {
        console.log('entrou')
        strWidth = Math.floor(Math.random() * ((((111 - beast.length) - (beast.length * 10)) - 1) + 1));
    }

    //PREENCHENDO COM POSSIVEIS LOCALIZACOES QUE A STRING PODE OCUPAR
    // FILTRAGEM POR LINHA
    for (let i = strWidth; i <= endposition; i++) {
        if (arrTdId.indexOf(i) !== -1) {
            arr.push(i);
        }
    }

    // NEM TODAS AS POSICOES A BEAST IRA CABER,POR ISSO É PRECISO FILTRAR 
    // FILTRAGEM POR COLUNA
    let arrResult = []
    arr.filter(element => {
        if (element < 10) {
            if (element <= (11 - beast.length)) {
                arrResult.push(element);
                // arrTdId.splice(arrTdId.indexOf(element),1);
            }
        } else {
            // NENHUMA POSICAO COM TERMINACAO DE 0(10,20,30...) NOS INTERESSA
            // POIS NENHUMA PALAVRA EH FORMADA COM APENAS UMA LETRA
            if (Number.parseInt(element.toString()[1]) === 0) {
                ;
            }
            else if (Number.parseInt(element.toString()[1]) <= (11 - beast.length)) {
                arrResult.push(element);
                // arrTdId.splice(arrTdId.indexOf(element),1);
            }
        }
    });

    // LENDO QUAL POSICAO A STRING IRA INICIALMENTE OCUPAR. EH SOMENTE A PRIMEIRA POSICAO QUE
    // QUE SE INICIA.
    positionSelect = Math.floor(Math.random() * arrResult.length);

    // RETORNA O ID SELECIONADO
    return arrResult[positionSelect];
}

// FUNCAO QUE GARANTE QUE ELEMENTOS NAO OCUPEM A MESMA LINHA E POR ISSO RETIRA TODOS
// OS ID'S (arrTdId) DAS <td> DA LINHA
const removeIdsLine = (digit) => {
    let cont = 0;
    for (let i = digit; limitsRight.indexOf(i) === -1; i++) {
        arrTdId.splice(arrTdId.indexOf(i), 1);
        cont = i;
    }
    cont++;
    arrTdId.splice(arrTdId.indexOf(cont), 1);

    cont = 0;
    for (let i = digit; limitsLeft.indexOf(i) === -1; i--) {
        arrTdId.splice(arrTdId.indexOf(i), 1);
        cont = i;
    }
    cont--;
    arrTdId.splice(arrTdId.indexOf(cont), 1);

    return arrTdId;
}

// FUNCAO QUE GARANTE QUE ELEMENTOS NAO OCUPEM A MESMA COLUNA E POR ISSO RETIRA TODOS
// OS ID'S (arrTdId) DAS <td> DA COLUNA
const removeIdsColumn = (digit) => {
    let cont = 0;

    for (let i = digit + 10; limitsBotton.indexOf(i) === -1; i += 10) {
        arrTdId.splice(arrTdId.indexOf(i), 1);
        cont = i;
    }
    cont += 10;
    arrTdId.splice(arrTdId.indexOf(cont), 1);
    cont = 0;

    if (limitsTop.indexOf(digit) !== -1) {
        arrTdId.splice(arrTdId.indexOf(digit), 1);
    } else {
        for (let i = digit; limitsTop.indexOf(i) === -1; i -= 10) {
            arrTdId.splice(arrTdId.indexOf(i), 1);
            cont = i;
        }

        cont -= 10;
        arrTdId.splice(arrTdId.indexOf(cont), 1);
    }

    return arrTdId;
}

// FUNCAO QUE GARANTE QUE ELEMENTOS NAO OCUPEM A MESMA DIAGONAL E POR ISSO RETIRA TODOS
// OS ID'S (arrTdId) DAS <td> DA DIAGONAL
const removeIdsDiagonal = (digit) => {
    let diagonalMain = [12, 23, 34, 45, 56, 67, 78, 89, 100];
    let cont = digit;
    
    if (diagonalMain.includes(digit)) {
        digit = 0;
    }
    else if (digit.toString().length === 2) {


        // SEO DIGITO FOR A FRONTEIRA NAO FAZ NADA,POIS JAH ESTA PRONTO
        if (limitsLeftTop.indexOf(digit) !== -1) { }
        else {
            cont = digit;
            for (let i = digit - 11; limitsLeftTop.indexOf(i) === -1; i -= 11) {
                arrTdId.splice(arrTdId.indexOf(i), 1);
                cont = i;
            }
            cont -= 11;
            arrTdId.splice(arrTdId.indexOf(cont), 1);
        }
    }
    // alert('aqui');
    
    cont = digit;
    for (let i = digit; limitsRightBotton.indexOf(i) === -1; i += 11) {
        arrTdId.splice(arrTdId.indexOf(i), 1);
        cont = i;
    }
    cont += 11;
    arrTdId.splice(arrTdId.indexOf(cont), 1);
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
    const zoo = ['abelha', 'arara', 'anta', 'boi', 'besouro', 'baleia', 'bode', 'cavalo', 'carneiro', 'enguia', 'ema', 'elefante', 'formiga', 'foca', 'falcão', 'gato', 'girafa', 'galinha', 'hiena', 'tatu']

    removeChildrensTable();

    // CRIANDO A TABELA
    createTable();


    arrTdId = returnAllTD(arrTd);

    // SELECIONA O ANIMAL E A REMOVE PARA NAO HAVER DUPLICACAO DE ANIMAIS NO TABULEIRO
    const beast1 = zoo.splice(Math.floor(Math.random() * zoo.length), 1).toString();
    const beast2 = zoo.splice(Math.floor(Math.random() * zoo.length), 1).toString();
    const beast3 = zoo.splice(Math.floor(Math.random() * zoo.length), 1).toString();

    // IRA DETERMINARA QUAL TIPO DE ORGAZINAZACAO SE ENCONTRARAO AS PALAVRAS: HORIZONTAL, VERTICAL OU DIAGONAL
    let typeOfOrganization = 3//Math.floor(Math.random() * (3 - 1) + 1);

    // ARMAZENA O GRUPO <td> QUE CONTEM O ELEMENTO
    let arrGroup = [];

    // ORGANIZACAO DAS PALAVRAS NA HORIZONTAL
    if (typeOfOrganization === 1) {
        // BEAST 1---------------------------------------------------------------------------------------------
        let selectId1 = randomPositionLine(beast1);
        removeIdsLine(selectId1);

        arrGroup = insertBeastLine(beast1, selectId1);

        elementsPositionsWin.push(arrGroup);
        arrGroup = [];

        // BEAST 2---------------------------------------------------------------------------------------------
        let selectId2 = randomPositionLine(beast2);
        removeIdsLine(selectId2);

        arrGroup = insertBeastLine(beast2, selectId2);

        elementsPositionsWin.push(arrGroup);
        arrGroup = [];

        // BEAST 3---------------------------------------------------------------------------------------------
        let selectId3 = randomPositionLine(beast3);
        removeIdsLine(selectId3);

        arrGroup = insertBeastLine(beast3, selectId3);

        elementsPositionsWin.push(arrGroup);
        arrGroup = [];
    }
    // ORGANIZACAO DAS PALAVRAS NA VERTICAL
    else if (typeOfOrganization === 2) {

        // BEAST 1---------------------------------------------------------------------------------------------
        let selectId1 = randomPositionColumn(beast1);
        removeIdsColumn(selectId1);

        arrGroup = insertBeastColumn(beast1, selectId1);

        elementsPositionsWin.push(arrGroup);
        arrGroup = [];

        // BEAST 2---------------------------------------------------------------------------------------------
        let selectId2 = randomPositionColumn(beast2);
        removeIdsColumn(selectId2);

        arrGroup = insertBeastColumn(beast2, selectId2);

        elementsPositionsWin.push(arrGroup);
        arrGroup = [];

        // BEAST 3---------------------------------------------------------------------------------------------
        let selectId3 = randomPositionColumn(beast3);
        removeIdsColumn(selectId3);

        arrGroup = insertBeastColumn(beast3, selectId3);

        elementsPositionsWin.push(arrGroup);
        arrGroup = [];
    }
    // ORGANIZACAO DAS PALAVRAS NA DIAGONAL
    else if (typeOfOrganization === 3) {
        // BEAST 1---------------------------------------------------------------------------------------------
        let selectId1 = randomPositionDiagonal(beast1);
        removeIdsDiagonal(selectId1, beast1);
        
        arrGroup = insertBeastDiagonal(beast1, selectId1);

        elementsPositionsWin.push(arrGroup);
        arrGroup = [];

        // BEAST 2---------------------------------------------------------------------------------------------
        let selectId2 = randomPositionDiagonal(beast2);
        removeIdsDiagonal(selectId2, beast2);

        arrGroup = insertBeastDiagonal(beast2, selectId2);

        elementsPositionsWin.push(arrGroup);
        arrGroup = [];

        // BEAST 2---------------------------------------------------------------------------------------------
        let selectId3 = randomPositionDiagonal(beast3);
        removeIdsDiagonal(selectId3, beast3);
        arrGroup = insertBeastDiagonal(beast3, selectId3);

        elementsPositionsWin.push(arrGroup);
        arrGroup = [];

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
    console.log(elementsPositionsWin);

    // INSERINDO O EVENTO NAS <td> DE VITÓRIA---------------------------------------------------------------
    // USO DE CAPTURING
    for (let z = 0; z < elementsPositionsWin.length; z++) {
        let arrAux = elementsPositionsWin[z];
        for (let i = 0; i < arrAux.length; i++) {
            const element = document.getElementById(arrAux[i]);
            element.addEventListener('click', youFind)
        }
    }

    // const tabela = document.getElementById('table');
    // table.addEventListener('click',youFind);


}

newGame();

