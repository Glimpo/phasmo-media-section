document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Tente TODOS os caminhos possíveis até funcionar
        const possiblePaths = [
            'data/media.json',                  // Caminho local
            '/phasmo-media-section/data/media.json', // Caminho GitHub Pages
            './data/media.json',                // Caminho relativo
            'https://glimpo.github.io/phasmo-media-section/data/media.json' // URL completa
        ];

        let response;
        for (const path of possiblePaths) {
            try {
                response = await fetch(path);
                if (response.ok) break;
            } catch (e) { /* Ignora e tenta próximo caminho */ }
        }

        if (!response || !response.ok) {
            throw new Error('Todos os caminhos falharam');
        }

        const data = await response.json();
        console.log("Dados carregados com sucesso:", data);

        // Renderiza os cards
        const renderCards = (items, containerId) => {
            const container = document.getElementById(containerId);
            if (!container) return;

            container.innerHTML = items.map(item => `
                <div class="card">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `).join('');
        };

        renderCards(data.photos, 'photos-container');
        renderCards(data.videos, 'videos-container');
        renderCards(data.sounds, 'sounds-container');

    } catch (error) {
        console.error("Erro crítico:", error);
        // Fallback visual
        document.querySelectorAll('.container').forEach(el => {
            el.innerHTML = '<p class="error">⚠️ Conteúdo temporariamente indisponível</p>';
        });
        
        // Carrega dados de fallback
        loadFallbackData();
    }
});

// Dados de emergência se o JSON não carregar
function loadFallbackData() {
    const fallbackData = {
        photos: [
            {title: "Exemplo Foto", description: "Evidência de fantasma capturada"},
            {title: "EMF Nível 5", description: "Leitura forte de atividade paranormal"}
        ],
        videos: [
            {title: "Porta Batendo", description: "Evento fantasma capturado em vídeo"}
        ],
        sounds: [
            {title: "Spirit Box", description: "Resposta clara da caixa de espíritos"}
        ]
    };
    
    ['photos', 'videos', 'sounds'].forEach(section => {
        const container = document.getElementById(`${section}-container`);
        if (container) {
            container.innerHTML = fallbackData[section].map(item => `
                <div class="card">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `).join('');
        }
    });
}
