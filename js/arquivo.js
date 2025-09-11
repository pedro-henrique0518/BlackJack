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

    constructor(id, valor, funImg, frenteImg){
        this.#id = id
        this.#valor = valor
        this.#funImg = funImg
        this.#frenteImg = frenteImg
    }
}

function gerarBaralho() {
    let elemento = document.querySelector(".baralho");
    let naipes = ["clubs", "diamonds", "hearts", "spades"];
    let nomes = [
        "ace", "2", "3", "4", "5", "6", "7", "8", "9", "10",
        "jack", "queen", "king"
    ];
    let html = "";

    for (let naipe of naipes) {
        for (let nome of nomes) {
            html += "<img src='img/cards/" + nome + "_of_" + naipe + ".png'>";
        }
    }

    elemento.innerHTML = html;
}

let lista = []
gerarBaralho()

//FUNÇÕES 
function gerarBaralho(){
    let elemento = document.querySelector(".baralho");
    let html = "";
    let prefixo = "";
    let sufixo = "";
    for(let i = 1; i <= 13; i++){
        if(i == 1){
            prefixo = "ace";
        }else if(i == 11){
            prefixo = "jack";
        }else if(i == 12){
            prefixo = "queen";
        }else if(i == 13){
            prefixo = "king";
        }else{
            prefixo = i + "";
        }

        for(let naipe = 0; naipe < 4; naipe++){
            if(naipe == 0){
                sufixo  = "clubs";
            }else if(naipe == 1){
                sufixo  = "diamonds";
            }else if(naipe == 2){
                sufixo = "hearts";
            }else if(naipe == 3){
                sufixo = "spades";
            }else{
                sufixo = "";
            }
            let img = "img/cards/" + prefixo + "_of_" + sufixo + ".png";
            let tag = "<img src='" + img + "'>";
            html += tag;
        }
    }
    elemento.innerHTML = html;
}