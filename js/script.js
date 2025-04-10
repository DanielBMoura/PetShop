// Função para verificar se o usuário já aceitou os cookies
function checkCookieConsent() {
  const cookieConsent = localStorage.getItem('cookie-consent');
  const userName = localStorage.getItem('user-name'); // Verifica se já existe um nome salvo

  if (cookieConsent === 'accepted') {
      // Se o consentimento for "aceito", não mostra o banner de cookies
      document.getElementById('cookie-banner').style.display = 'none';
      
      if (!userName) {
          showNameAlert();
      } else {
          showWelcomeAlert(userName);
      }
  } else {
      // Se o consentimento não foi dado, mostra o banner de cookies
      document.getElementById('cookie-banner').style.display = 'block';
  }
}

// Função para aceitar os cookies
document.getElementById('accept-btn').addEventListener('click', function () {
  localStorage.setItem('cookie-consent', 'accepted');  // Marca o consentimento como "aceito"
  document.getElementById('cookie-banner').style.display = 'none';  // Esconde o banner
  showNameAlert();  // Exibe o alerta para o nome
});

// Função para recusar os cookies
document.getElementById('decline-btn').addEventListener('click', function () {
  // Não armazenamos nada no localStorage para "recusar" para que o banner apareça novamente
  document.getElementById('cookie-banner').style.display = 'none';  // Esconde o banner
  // Quando recusar, o banner aparecerá novamente ao voltar para o site
});

// Função para exibir o alerta de nome
function showNameAlert() {
  document.getElementById('name-alert').style.display = 'block';  // Exibe o alerta para o nome
}

// Função para enviar o nome
document.getElementById('submit-name').addEventListener('click', function () {
  const userName = document.getElementById('user-name').value;
  if (userName) {
      localStorage.setItem('user-name', userName);  // Salva o nome no localStorage
      showWelcomeAlert(userName);  // Exibe o alerta de boas-vindas
      document.getElementById('name-alert').style.display = 'none';  // Esconde o alerta de nome
  } else {
      alert("Por favor, digite um nome.");
  }
});

// Função para exibir o alerta de boas-vindas personalizado
function showWelcomeAlert(userName) {
  const welcomeMessage = `Bem-vindo, ${userName}!`;
  document.getElementById('welcome-message').textContent = welcomeMessage;
  document.getElementById('welcome-alert').style.display = 'block';  // Exibe o alerta de boas-vindas
}

// Função para fechar o alerta de boas-vindas
document.getElementById('close-alert').addEventListener('click', function () {
  document.getElementById('welcome-alert').style.display = 'none';  // Fecha o alerta de boas-vindas
});

// Verifica se o consentimento foi dado anteriormente
checkCookieConsent();


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