// ========================================
// NAVEGAÇÃO SUAVE
// ========================================
// Implementa rolagem suave para links internos (âncoras)
// Quando um link com href começando com # é clicado, rola suavemente até a seção
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Previne o comportamento padrão do link
        const target = document.querySelector(this.getAttribute('href')); // Encontra o elemento alvo
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth', // Rolagem suave
                block: 'start' // Alinha o topo da seção com o topo da viewport
            });
        }
    });
});

// ========================================
// NAVEGAÇÃO ENTRE SEÇÕES DE PROJETOS
// ========================================
// Gerencia a troca entre as categorias de projetos (Frontend, Backend, Dados)
function mostrarSecaoProjetos(categoria) {
    // Remove a classe 'active' de todos os botões de navegação
    document.querySelectorAll('.projeto-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Adiciona a classe 'active' ao botão que foi clicado
    document.querySelector(`[onclick="mostrarSecaoProjetos('${categoria}')"]`).classList.add('active');
    
    // Oculta todas as seções de projetos
    document.querySelectorAll('.projeto-secao').forEach(secao => {
        secao.classList.remove('ativa');
    });
    
    // Mostra apenas a seção selecionada
    document.getElementById(`${categoria}-secao`).classList.add('ativa');
    
    // Reseta o carrossel da seção ativa após a transição
    setTimeout(() => {
        const container = document.getElementById(`${categoria}-projetos`);
        if (container) {
            container.scrollLeft = 0; // Volta ao início do carrossel
            atualizarBotoesCarrossel(categoria); // Atualiza estado dos botões
        }
    }, 300); // Delay para permitir a transição CSS
}

// ========================================
// DADOS DOS PROJETOS
// ========================================
// Estrutura de dados que contém informações sobre todos os projetos
// Organizada por categoria: frontend, backend, dados
const projetosData = {
    frontend: [
        {
            titulo: 'Em Breve',
            descricao: 'Novos projetos de Front-End estão sendo desenvolvidos',
            tecnologias: ['HTML', 'CSS', 'JS'],
            icone: 'placeholder.png'
        }
    ],
    backend: [
        {
            titulo: 'Em Breve',
            descricao: 'Novos projetos de Back-End estão sendo desenvolvidos',
            tecnologias: ['Python', 'Java', 'FastAPI'],
            icone: 'placeholder.png'
        }
    ],
    dados: [
        {
            titulo: 'Análise Estratégica: Mercado do Airbnb na Europa',
            descricao: 'Análise de 1.100 registros para identificar fatores que influenciam preços de aluguéis em cidades europeias',
            tecnologias: ['Python', 'Análise SWOT', 'Data Analysis'],
            icone: 'airbnb.png'
        },
        {
            titulo: 'Análise Ambiental: Desmatamento e CO₂',
            descricao: 'Projeto em equipe analisando impacto do desmatamento no Brasil e correlação com emissões de CO₂',
            tecnologias: ['Python', 'Power BI', 'SQL', 'ETL'],
            icone: 'greendata.png'
        },
        {
            titulo: 'Case Corp Solutions - Diversidade',
            descricao: 'Projeto premiado em 1º lugar no Hackathon Corp Solutions. Análise de dados para promover diversidade e inclusão no RH',
            tecnologias: ['Python', 'Pandas', 'Power BI', 'Jupyter'],
            icone: 'corpsolutions.png'
        },
        {
            titulo: 'Dashboard Vendas, Custo, Margem de Lucro e KPI',
            descricao: 'Dashboard interativo para acompanhar desempenho de vendas, custos logísticos e margens de lucro com análise de KPIs',
            tecnologias: ['Data viz', 'Power BI', 'KPIs', 'Análise'],
            icone: 'dash.png'
        }
    ]
};

// ========================================
// CARROSSEL DE PROJETOS
// ========================================
// Função para navegar entre projetos no carrossel (anterior/próximo)
function navegarProjetos(categoria, direcao) {
    const container = document.getElementById(`${categoria}-projetos`);
    const cards = container.querySelectorAll('.projeto-card');
    
    if (cards.length === 0) return; // Se não há cards, não faz nada
    
    // Calcula a largura de um card + gap (espaçamento)
    const cardWidth = cards[0].offsetWidth + 32;
    
    // No mobile, rola para o próximo card completo
    const scrollAmount = direcao * cardWidth;
    
    // Executa a rolagem suave
    container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
    
    // Atualiza o estado dos botões após um pequeno delay
    setTimeout(() => {
        atualizarBotoesCarrossel(categoria);
    }, 300);
}

// ========================================
// ATUALIZAÇÃO DOS BOTÕES DO CARROSSEL
// ========================================
// Controla a visibilidade e estado dos botões anterior/próximo
function atualizarBotoesCarrossel(categoria) {
    const container = document.getElementById(`${categoria}-projetos`);
    if (!container) return;
    
    const carousel = container.parentElement;
    const prevBtn = carousel.querySelector('.prev'); // Botão anterior
    const nextBtn = carousel.querySelector('.next'); // Botão próximo
    
    if (!prevBtn || !nextBtn) return;
    
    // Verifica se pode rolar para trás (não está no início)
    if (container.scrollLeft <= 10) {
        prevBtn.style.opacity = '0.5'; // Desabilita visualmente
        prevBtn.disabled = true; // Desabilita funcionalmente
    } else {
        prevBtn.style.opacity = '1'; // Habilita visualmente
        prevBtn.disabled = false; // Habilita funcionalmente
    }
    
    // Verifica se pode rolar para frente (não está no final)
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (container.scrollLeft >= maxScroll - 10) {
        nextBtn.style.opacity = '0.5'; // Desabilita visualmente
        nextBtn.disabled = true; // Desabilita funcionalmente
    } else {
        nextBtn.style.opacity = '1'; // Habilita visualmente
        nextBtn.disabled = false; // Habilita funcionalmente
    }
}

// ========================================
// INICIALIZAÇÃO DOS CARROSSÉIS
// ========================================
// Configura todos os carrosséis quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    // Para cada categoria de projetos
    ['frontend', 'backend', 'dados'].forEach(categoria => {
        const container = document.getElementById(`${categoria}-projetos`);
        if (container) {
            atualizarBotoesCarrossel(categoria); // Estado inicial dos botões
            
            // Adiciona listener para detectar mudanças no scroll
            container.addEventListener('scroll', () => {
                atualizarBotoesCarrossel(categoria);
            });
            
            // Garante que o scroll funcione corretamente
            container.style.scrollBehavior = 'smooth';
        }
    });
    
    // Mostra a seção frontend por padrão
    mostrarSecaoProjetos('frontend');
});

// ========================================
// BOTÃO VOLTAR AO TOPO
// ========================================
const btnTopo = document.getElementById('btn-topo');

// Mostra/oculta o botão baseado na posição do scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) { // Aparece após 300px de scroll
        btnTopo.classList.add('visible');
    } else {
        btnTopo.classList.remove('visible');
    }
});

// Função para voltar ao topo da página
function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Rolagem suave
    });
}

// ========================================
// ANIMAÇÕES AO SCROLL
// ========================================
// Configurações do Intersection Observer para animações
const observerOptions = {
    threshold: 0.1, // Dispara quando 10% do elemento está visível
    rootMargin: '0px 0px -50px 0px' // Margem adicional para controle
};

// Observer que detecta quando elementos entram na viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Aplica a animação quando o elemento fica visível
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Configura as animações quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    const elementosAnimacao = document.querySelectorAll('.projeto-card, .ferramenta-item');
    
    elementosAnimacao.forEach(el => {
        // Estado inicial: invisível e deslocado para baixo
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el); // Começa a observar o elemento
    });
});

// ========================================
// NAVEGAÇÃO ATIVA
// ========================================
// Atualiza qual link da navegação está ativo baseado na seção atual
function atualizarNavegacaoAtiva() {
    const secoes = document.querySelectorAll('section[id]'); // Todas as seções com ID
    const navLinks = document.querySelectorAll('.nav-link'); // Todos os links da navegação
    
    let secaoAtual = '';
    
    // Verifica qual seção está atualmente visível
    secoes.forEach(secao => {
        const secaoTop = secao.offsetTop - 100; // Topo da seção com offset
        const secaoHeight = secao.offsetHeight; // Altura da seção
        
        // Se o scroll está dentro desta seção
        if (window.pageYOffset >= secaoTop && window.pageYOffset < secaoTop + secaoHeight) {
            secaoAtual = secao.getAttribute('id');
        }
    });
    
    // Atualiza os links da navegação
    navLinks.forEach(link => {
        link.classList.remove('active'); // Remove ativo de todos
        if (link.getAttribute('href') === `#${secaoAtual}`) {
            link.classList.add('active'); // Adiciona ativo ao link correto
        }
    });
}

// Listener para atualizar navegação durante o scroll
window.addEventListener('scroll', atualizarNavegacaoAtiva);

// ========================================
// EFEITO DE DIGITAÇÃO NO SOBRE
// ========================================
// Simula o efeito de digitação em tempo real
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = ''; // Limpa o conteúdo inicial
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i); // Adiciona um caractere
            i++;
            setTimeout(type, speed); // Agenda o próximo caractere
        }
    }
    
    type(); // Inicia o efeito
}

// Inicializa o efeito de digitação quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    const sobreTitle = document.querySelector('.pixel-title');
    if (sobreTitle) {
        const originalText = sobreTitle.innerHTML; // Salva o texto original
        typeWriter(sobreTitle, originalText, 50); // Inicia o efeito com velocidade 50ms
    }
});

// ========================================
// LAZY LOADING PARA IMAGENS
// ========================================
// Carrega imagens apenas quando entram na viewport (otimização de performance)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]'); // Imagens com data-src
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; // Carrega a imagem
                img.classList.remove('lazy'); // Remove classe lazy
                imageObserver.unobserve(img); // Para de observar esta imagem
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img)); // Observa todas as imagens
}

// Inicializa o lazy loading quando a página carrega
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ========================================
// PRELOADER (OPCIONAL)
// ========================================
// Esconde o preloader quando a página termina de carregar
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0'; // Fade out
        setTimeout(() => {
            preloader.style.display = 'none'; // Remove do DOM
        }, 300); // Aguarda a transição
    }
});

// ========================================
// VALIDAÇÃO DE FORMULÁRIO
// ========================================
// Valida campos obrigatórios de formulários
function validarFormulario(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]'); // Campos obrigatórios
    let valido = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) { // Se está vazio
            input.classList.add('erro'); // Adiciona classe de erro
            valido = false;
        } else {
            input.classList.remove('erro'); // Remove classe de erro
        }
    });
    
    return valido; // Retorna se o formulário é válido
}

// ========================================
// UTILITÁRIOS
// ========================================
// Função debounce para otimizar performance em eventos frequentes
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplica debounce ao scroll para melhorar performance
window.addEventListener('scroll', debounce(() => {
    atualizarNavegacaoAtiva();
}, 10));

// ========================================
// ATUALIZAR ANO NO FOOTER
// ========================================
// Atualiza automaticamente o ano no footer
function atualizarAno() {
    const anoAtual = document.getElementById('ano-atual');
    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear(); // Ano atual
    }
}

// Inicializa o ano quando a página carrega
document.addEventListener('DOMContentLoaded', atualizarAno);


  