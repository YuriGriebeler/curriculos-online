// Atualiza o preço com base na escolha do tipo de currículo
document.getElementById('curriculo-tipo').addEventListener('change', function() {
    const selectedOption = this.value;
    const precoSpan = document.getElementById('preco');
    
    if (selectedOption === 'simples') {
        precoSpan.textContent = 'R$10,00';
    } else if (selectedOption === 'elaborado') {
        precoSpan.textContent = 'R$20,00';
    }
});

// Mostra o formulário de solicitação de currículo
document.getElementById('solicitar').addEventListener('click', function() {
    document.getElementById('form-container').style.display = 'block'; // Exibe o formulário
    this.style.display = 'none'; // Oculta o botão "Solicitar Currículo"
});

// Processa o formulário e envia a solicitação
document.getElementById('curriculo-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Coleta os dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
    const linkedin = document.getElementById('linkedin').value;
    const experiencia = document.getElementById('experiencia').value;
    const objetivo = document.getElementById('objetivo').value;
    const tipoCurriculo = document.getElementById('curriculo-tipo').value;
    const preco = document.getElementById('preco').textContent;

    // Monta a string com os dados da solicitação
    const dadosSolicitacao = {
        nome,
        email,
        telefone,
        endereco,
        linkedin,
        experiencia,
        objetivo,
        tipoCurriculo,
        preco,
    };

    // Envia a solicitação ao back-end
    fetch('/api/solicitar-curriculo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosSolicitacao),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Exibe a resposta do servidor no console
        document.getElementById('resultado').style.display = 'block'; // Exibe a seção de resultados
        document.getElementById('dados-solicitacao').textContent = JSON.stringify(dadosSolicitacao, null, 2); // Mostra os dados da solicitação
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});
