// Calendar Logic
document.addEventListener('DOMContentLoaded', function() {
  const mes = document.getElementById('mes');
  const dias = document.getElementById('dias');
  const eventosLista = document.getElementById('eventos-lista');
  const eventos = [
    { date: '2025-04-21', title: 'Balé para Homens 1', time: '13:15' },
    { date: '2025-04-22', title: 'Balé Iniciante', time: '10:00' },
    { date: '2025-04-23', title: 'Balé Avançado Masculino', time: '18:00' },
    { date: '2025-04-24', title: 'Balé para Homens 1', time: '13:15' },
    { date: '2025-04-28', title: 'Balé Avançado Masculino', time: '18:00' },
    { date: '2025-04-29', title: 'Workshop: Saltos no Balé', time: '15:00' }
  ];
  
  let currentDate = new Date();
  renderCalendar();

  function renderCalendar() {
    const monthName = currentDate.toLocaleString('pt-BR', { month: 'long' });
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    mes.textContent = `${capitalizedMonth} ${currentDate.getFullYear()}`;
    
    dias.innerHTML = '';
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    // Dias vazios para o primeiro dia do mês
    for (let i = 0; i < firstDay; i++) {
      dias.innerHTML += '<div class="h-8"></div>';
    }

    // Dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement('div');
      dayElement.textContent = i;
      dayElement.className = 'h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-pink-100';
      
      // Destacar dia atual
      const today = new Date();
      if (i === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()) {
        dayElement.classList.add('bg-pink-600', 'text-white');
      }
      
      // Verificar se há eventos neste dia
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayEvents = eventos.filter(e => e.date === dateStr);
      
      if (dayEvents.length > 0) {
        dayElement.classList.add('font-bold');
        dayElement.innerHTML += '<span class="absolute bottom-0 w-1 h-1 bg-pink-600 rounded-full"></span>';
      }
      
      dayElement.addEventListener('click', () => showEvents(i));
      dias.appendChild(dayElement);
    }
  }

  function showEvents(day) {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEvents = eventos.filter(e => e.date === dateStr);
    
    if (dayEvents.length > 0) {
      eventosLista.innerHTML = dayEvents.map(e => `
        <li class="bg-pink-50 p-3 rounded-lg">
          <div class="font-semibold">${e.title}</div>
          <div class="text-sm text-gray-600"><i class="far fa-clock mr-1"></i>${e.time}</div>
        </li>
      `).join('');
    } else {
      eventosLista.innerHTML = '<li class="text-gray-500">Nenhum evento agendado para este dia.</li>';
    }
    
    // Atualizar título para mostrar a data selecionada
    const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    eventosLista.previousElementSibling.textContent = `Eventos em ${dateObj.toLocaleDateString('pt-BR', options)}`;
  }

  // Swiper.js Initialization
  const swipers = document.querySelectorAll('.swiper-container');
  swipers.forEach(swiper => {
    new Swiper(swiper, {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    });
  });
});

// Inscription Logic
window.inscrever = function(aula) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
  modal.innerHTML = `
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <h3 class="text-xl font-bold text-pink-600 mb-4">Inscrição para ${aula}</h3>
      <p class="mb-4">Por favor, entre em contato para confirmar sua inscrição e obter mais informações.</p>
      <div class="flex justify-between">
        <button onclick="this.closest('div').remove()" class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors">Fechar</button>
        <a href="#contato" onclick="document.querySelector('#contato-mensagem').value = 'Gostaria de me inscrever na aula: ${aula}'; this.closest('div').remove()" class="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-800 transition-colors">Ir para Contato</a>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
};

// Shopping Cart Logic
let carrinho = [];
let total = 0;

window.adicionarCarrinho = function(nome, preco) {
  carrinho.push({ nome, preco });
  total += preco;
  updateCart();
  
  // Feedback visual
  const feedback = document.createElement('div');
  feedback.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg';
  feedback.textContent = `${nome} adicionado ao carrinho!`;
  document.body.appendChild(feedback);
  setTimeout(() => feedback.remove(), 2000);
};

function updateCart() {
  const carrinhoLista = document.getElementById('carrinho-lista');
  const totalElement = document.getElementById('total');
  
  if (carrinho.length === 0) {
    carrinhoLista.innerHTML = '<li class="text-gray-500">Seu carrinho está vazio</li>';
  } else {
    carrinhoLista.innerHTML = carrinho.map((item, index) => `
      <li class="flex justify-between items-center py-2 border-b">
        <span>${item.nome}</span>
        <div class="flex items-center">
          <span class="mr-4">R$ ${item.preco.toFixed(2)}</span>
          <button onclick="removerItem(${index})" class="text-red-500 hover:text-red-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </li>
    `).join('');
  }
  
  totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

window.removerItem = function(index) {
  total -= carrinho[index].preco;
  carrinho.splice(index, 1);
  updateCart();
};

window.finalizarCompra = function() {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
  modal.innerHTML = `
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <h3 class="text-xl font-bold text-pink-600 mb-4">Finalizar Compra</h3>
      <p class="mb-4">Itens no carrinho:</p>
      <ul class="mb-4 max-h-60 overflow-y-auto">
        ${carrinho.map(item => `<li class="py-1 border-b">${item.nome} - R$ ${item.preco.toFixed(2)}</li>`).join('')}
      </ul>
      <p class="font-bold text-lg mb-4">Total: R$ ${total.toFixed(2)}</p>
      <p class="mb-4">Para finalizar sua compra, entre em contato conosco.</p>
      <div class="flex justify-between">
        <button onclick="this.closest('div').remove()" class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors">Continuar Comprando</button>
        <a href="#contato" onclick="document.querySelector('#contato-mensagem').value = 'Gostaria de finalizar a compra dos seguintes itens:\\n${carrinho.map(item => `- ${item.nome} (R$ ${item.preco.toFixed(2)})`).join('\\n')}\\n\\nTotal: R$ ${total.toFixed(2)}'; this.closest('div').remove()" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors">Ir para Contato</a>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
};

// Contact Logic
window.enviarContato = async function() {
  const nome = document.getElementById('contato-nome').value.trim();
  const email = document.getElementById('contato-email').value.trim();
  const mensagem = document.getElementById('contato-mensagem').value.trim();
  const resposta = document.getElementById('resposta');

  if (!nome || !email || !mensagem) {
    resposta.textContent = 'Por favor, preencha todos os campos.';
    resposta.className = 'text-red-500';
    return;
  }

  // Simulação de envio (substituir por chamada real à API)
  resposta.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
  resposta.className = 'text-green-500';
  
  // Limpar campos
  document.getElementById('contato-nome').value = '';
  document.getElementById('contato-email').value = '';
  document.getElementById('contato-mensagem').value = '';
  
  // Feedback visual
  setTimeout(() => {
    resposta.textContent = '';
  }, 5000);
};