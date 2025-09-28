// Função para reiniciar o jogo
function reiniciarJogo() {
    mao = [];
    maoBanca = [];
    deck = new Pilha();
    gerarBaralho();
    embaralhar();
    empilhar();

    let elMao = document.querySelector("#mao");
    let elMaoBanca = document.querySelector("#mao-banca");
    let elPontJog = document.querySelector("#pontuacao-jogador");
    let elPontBanca = document.querySelector("#pontuacao-banca");
    let elResultado = document.querySelector("#resultado-jogo");
    if(elMao) elMao.innerHTML = "";
    if(elMaoBanca) elMaoBanca.innerHTML = "";
    if(elPontJog) elPontJog.textContent = "Pontuação: 0";
    if(elPontBanca) elPontBanca.textContent = "Pontuação: 0";
    if(elResultado) elResultado.textContent = "";
}


let maoBanca = [];

function desenharBanca() {
    let elemento = document.querySelector("#mao-banca");
    let pontuacaoElemento = document.querySelector("#pontuacao-banca");
    let html = "";
    for(let i=0; i < maoBanca.length; i++){
        html += "<img src='" + maoBanca[i].getFrenteImg() + "'>";
    }
    if(elemento) elemento.innerHTML = html;
    if(pontuacaoElemento) pontuacaoElemento.textContent = "Pontuação: " + calcularPontuacao(maoBanca);
}


function pararJogador() {
    while (calcularPontuacao(maoBanca) < 17) {
        let carta = deck.top();
        if (!carta) break;
        maoBanca.push(carta);
        deck.pop();
    }
    desenharBanca();
    mostrarResultado();
}


function mostrarResultado() {
    let pontosJogador = calcularPontuacao(mao);
    let pontosBanca = calcularPontuacao(maoBanca);
    let mensagem = "";
    if (pontosJogador > 21) {
        mensagem = "Você estourou! Banca vence.";
    } else if (pontosBanca > 21) {
        mensagem = "Banca estourou! Você vence!";
    } else if (pontosJogador > pontosBanca) {
        mensagem = "Você venceu!";
    } else if (pontosJogador < pontosBanca) {
        mensagem = "Banca venceu!";
    } else {
        mensagem = "Empate!";
    }
    let resultadoDiv = document.getElementById("resultado-jogo");
    if(resultadoDiv) resultadoDiv.textContent = mensagem;
}

function calcularPontuacao(mao) {
    let soma = 0;
    let ases = 0;
    for (let i = 0; i < mao.length; i++) {
        let valor = mao[i].getValor();
        soma += valor;
        if (valor === 1) ases++;
    }
    
    while (ases > 0 && soma + 10 <= 21) {
        soma += 10;
        ases--;
    }
    return soma;
}

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

    constructor(id, valor, funImg, frenteImg){
        this.#id = id
        this.#valor = valor
        this.#funImg = funImg
        this.#frenteImg = frenteImg
    }
    getId(){
        return this.#id
    }
    getFrenteImg(){
        return this.#frenteImg;
    }
    getValor(){
        return this.#valor;
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

// Função para virar carta ao clicar
function virarCarta(){
    let elemento = document.querySelector("#mao");
    let pontuacaoElemento = document.querySelector("#pontuacao-jogador");
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
    // Exibe a pontuação
    if(pontuacaoElemento) pontuacaoElemento.textContent = "Pontuação: " + calcularPontuacao(mao);
}