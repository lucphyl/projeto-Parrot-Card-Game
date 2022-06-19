const cards = document.querySelectorAll('.cartas');

let contador = 0;
let idInterval;
let minutos = 0;
let jogadas = 0;
let virou = false;
let travar = false;
let primeira, segunda;
let pares = 0;
let começo = 0;

function virar() {
    contar();
  if (travar) return;
  if (this === primeira) return;

  this.classList.add('flip');

  if (!virou) {
    virou = true;
    primeira = this;

    return;
  }

  segunda = this;
  combinação();
  jogadas ++;
  
}

function combinação() {
  let combina = primeira.dataset.framework === segunda.dataset.framework;

  combina ? desabilitar() : desvirarCartas();
    if(primeira==segunda){
        pares++
    }
    fim ();
}

function desabilitar() {
  primeira.removeEventListener('click', virar);
  segunda.removeEventListener('click', virar);

  resetar();
}

function desvirarCartas() {
  travar = true;

  setTimeout(() => {
    primeira.classList.remove('flip');
    segunda.classList.remove('flip');

    resetar();
  }, 1500);
}

function resetar() {
  [virou, travar] = [false, false];
  [primeira, segunda] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

function fim (){
    if (pares==7){
        alert( 'você ganhou em ' + jogadas + " jogadas e levou " +minutos + " minuntos e " + contador + " segundos");
        começo=prompt( "digite '1' para recomeçar");

    }

}
function recomeçar (){
    
    if(começo==1){
        cards.classList.removeall("flip");
        jogadas=0;
        pares=0;
        [virou, travar] = [false, false];
        [primeira, segunda] = [null, null];
        shuffle();
    }
}

function contar() {
    //Esse if evita mais de um agendamento - Não precisa fazer
    if (idInterval === undefined) {
      document.querySelector(".segundos").innerHTML = contador;
      document.querySelector(".minutos").innerHTML = minutos;
      idInterval = setInterval(decrementarContador, 1000);
    }
  }
  function decrementarContador() {
    contador++;
    document.querySelector(".segundos").innerHTML = contador;
    document.querySelector(".minutos").innerHTML = minutos;
    if (contador === 60) {
      contador = 0;
      minutos++;
      idInterval = undefined;
    }
  }

cards.forEach(card => card.addEventListener('click', virar));