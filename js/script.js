function lerCookie(nome) {
  const matches = document.cookie.match(new RegExp('(^| )' + nome + '=([^;]+)'))
  return matches ? decodeURIComponent(matches[2]) : null
}

function criarCookie(nome, valor, diasDeExpiracao) {
  const dataExpiracao = new Date()
  dataExpiracao.setTime(dataExpiracao.getTime() + (diasDeExpiracao * 24 * 60 * 60 * 1000))
  document.cookie = nome + "=" + encodeURIComponent(valor) + "; expires=" + dataExpiracao.toUTCString() + "; path=/"
}

const nomeDoUsuario = lerCookie("usuario")

if (nomeDoUsuario) {
  alert("Bem-vindo de volta, " + nomeDoUsuario + "!")
} else {

  const nomeUsuario = prompt("Qual é o seu nome?")
  
  if (nomeUsuario) {
    criarCookie("usuario", nomeUsuario, 1)
    console.log("Olá, " + nomeUsuario + "! Seu nome foi salvo.")
  } else {
    console.log("O nome não foi fornecido.")
  }
}

let slideIndex = 0;

const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
const dots = document.querySelectorAll('.dot');

document.querySelector('.next').addEventListener('click', () => {
  moveToNextSlide();
});

document.querySelector('.prev').addEventListener('click', () => {
  moveToPrevSlide();
});

function moveToNextSlide() {
  slideIndex = (slideIndex + 1) % totalSlides;
  updateCarousel();
}

function moveToPrevSlide() {
  slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

function currentSlide(index) {
  slideIndex = index;
  updateCarousel();
}

function updateCarousel() {
  const offset = -slideIndex * 100;
  slides.style.transform = `translateX(${offset}%)`;

  // Atualizar os indicadores
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === slideIndex);
  });
}

// Alternar automaticamente a cada 3 segundos
setInterval(() => {
  moveToNextSlide();
}, 3000);

// Iniciar o carousel com o primeiro slide ativo
updateCarousel();
