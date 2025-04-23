// Calendar Logic
document.addEventListener('DOMContentLoaded', function() {
  const mes = document.getElementById('mes');
  const dias = document.getElementById('dias');
  const eventosLista = document.getElementById('eventos-lista');
  const eventos = [
    { date: '2025-04-21', title: 'Balé para Homens 1', time: '13:15' },
    { date: '2025-04-22', title: 'Balé Iniciante', time: '10:00' }
  ];
  let currentDate = new Date();
  renderCalendar();

  function renderCalendar() {
    mes.textContent = currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
    dias.innerHTML = '';
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) dias.innerHTML += '<div></div>';
    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement('div');
      dayElement.textContent = i;
      dayElement.className = 'p-2 text-center bg-gray-200 rounded-lg cursor-pointer hover:bg-pink-200';
      dayElement.addEventListener('click', () => showEvents(i));
      dias.appendChild(dayElement);
    }
  }

  function showEvents(day) {
    const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    eventosLista.innerHTML = eventos.filter(e => e.date === date)
      .map(e => `<li class="my-1">${e.title} - ${e.time}</li>`).join('') || '<li>Sem eventos</li>';
  }
});

// Inscription Logic
window.inscrever = function(aula) {
  alert(`Inscrição para ${aula} selecionada! Entre em contato para confirmar.`);
};

// Shopping Cart Logic
let carrinho = [];
let total = 0;
const carrinhoLista = document.getElementById('carrinho-lista');
const totalElement = document.getElementById('total');

window.adicionarCarrinho = function(nome, preco) {
  carrinho.push({ nome, preco });
  total += preco;
  carrinhoLista.innerHTML = carrinho.map(item => `<li class="my-1">${item.nome} - R$ ${item.preco.toFixed(2)}</li>`).join('');
  totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
};

// Contact Logic
window.enviarContato = async function() {
  const nome = document.getElementById('contato-nome').value;
  const email = document.getElementById('contato-email').value;
  const mensagem = document.getElementById('contato-mensagem').value;
  const resposta = document.getElementById('resposta');

  if (!nome || !email || !mensagem) {
    resposta.textContent = 'Preencha todos os campos.';
    resposta.className = 'text-red-500';
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/contato', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, mensagem })
    });
    const data = await response.json();
    resposta.textContent = data.message;
    resposta.className = 'text-green-500';
    document.getElementById('contato-nome').value = '';
    document.getElementById('contato-email').value = '';
    document.getElementById('contato-mensagem').value = '';
  } catch (error) {
    resposta.textContent = 'Erro ao enviar mensagem.';
    resposta.className = 'text-red-500';
    console.error('Erro:', error);
  }
};