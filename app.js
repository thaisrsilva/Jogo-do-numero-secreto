//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jodo de Número Secreto';  "Criando um titulo"

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';    "Inserindo um titulo"

let listaDeNumeroSortedos = [];    //Implementando uma lista
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto ) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});    //Colocando voz no jogo
}

function exibirMensagemInicial(){
exibirTextoNaTela('h1', 'Jodo de Número Secreto');
exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobruiu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas );
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
    //console.log(chute == numeroSecreto);  "Quando quiser mostrar no console" 
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumeroSortedos.length;

    if (quantidadeDeElementosNaLista == 3){
        listaDeNumeroSortedos = [];
    }

    if(listaDeNumeroSortedos.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else {
        listaDeNumeroSortedos.push(numeroEscolhido);
        console.log(listaDeNumeroSortedos); 
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}