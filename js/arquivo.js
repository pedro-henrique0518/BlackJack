class Pilha{

    /*
    push - adiciona um elemento
    top - retorna o elemento do topo
    size/length - a quantidade de elementos
    empty - exibe se a pilha está vazia (true/false)
    pop - remove o elemento do topo
    print - imprime a pilha
    cleat - limpa a pilha
    */

    #items = []

    size(){
        return this.#items.length
    }

    empty(){
        return this.size() == 0 ? true : false
    }

    push(param){
        this.#items.push(param)
    }

    top(){
        return this.#items[this.size() -1]
    }

    pop(){
        this.#items.pop()
    }
    constructor(){

    }
}

class Carta{
    #id = ""
    #valor = 0
    #funImg = ""
    #frenteImg = ""

    getId(){
        return this.#id
    }
    getFrenteImg(){
        return this.#frenteImg;
    }
    constructor(id, valor, funImg, frenteImg){
        this.#id = id
        this.#valor = valor
        this.#funImg = funImg
        this.#frenteImg = frenteImg
    }
}

function gerarBaralho() {
    let naipes = ["clubs", "diamonds", "hearts", "spades"];
    let nomes = [
        "ace", "2", "3", "4", "5", "6", "7", "8", "9", "10",
        "jack", "queen", "king"
    ];
    lista = [];
    for (let naipe of naipes) {
        for (let i = 0; i < nomes.length; i++) {
            let nome = nomes[i];
            let valor = i + 1;
            if (valor > 10) valor = 10;
            let id = nome + naipe[0];
            let img = "img/cards/" + nome + "_of_" + naipe + ".png";
            let carta = new Carta(id, valor, "img/cards/back_01.png", img);
            lista.push(carta);
        }
    }
}

let lista = [];
let deck = new Pilha();
let mao = [];

// Inicializa tudo ao carregar
window.onload = function() {
    gerarBaralho();
    embaralhar();
    empilhar();
};

// ...existing code...

function desenharBaralho(){
    let elemento = document.querySelector(".baralho");
    let html = "";
    for(let i = 0; i < lista.length; i++){
        let img = "<img src='" + lista[i].getFrenteImg() + "'>";
        html += img;
    }
    elemento.innerHTML = html;
}

function sortearNumero(){
    let min = 0;
    let max = 51;
    let numero = Math.floor(Math.random() *  (max - min + 1)) + min;
    return numero;
}

function embaralhar(){
    let baralho = [];
    while(baralho.length < 52){
        let indice = sortearNumero();
        let encontrado = false;
        for(let i = 0; i < baralho.length; i++){
            if(lista[indice].getId() == baralho[i].getId()){
                encontrado = true;
                break;
            }
        }
        if(!encontrado){
            baralho.push(lista[indice]);
        }
    }
    lista = baralho;
}

function empilhar(){
    for(let i = 0; i < lista.length; i++){
        deck.push(lista[i]);
    }
    console.log("Quantidade de cartas no deck: " + deck.size());
}


function virarCarta(){
    let elemento = document.querySelector("#mao");
    let carta = deck.top();
    let html = "";
    if (carta) {
        mao.push(carta);
        deck.pop();
    }
    // Mostra todas as cartas viradas
    for(let i=0; i < mao.length; i++){
        html += "<img src='" + mao[i].getFrenteImg() + "'>";
    }
    if(elemento) elemento.innerHTML  = html;
}