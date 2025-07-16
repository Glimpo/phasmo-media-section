document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 1. Carrega os dados
        const response = await fetch('../data/media.json');
        if (!response.ok) throw new Error('Failed to load data');
        const data = await response.json();
        
        // 2. Função para criar cards
        const createCard = (title, description) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-content">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            `;
            return card;
        };
        
        // 3. Preenche cada seção
        data.photos.forEach(item => {
            document.getElementById('photos-container').appendChild(
                createCard(item.title, item.description)
            );
        });
        
        data.videos.forEach(item => {
            document.getElementById('videos-container').appendChild(
                createCard(item.title, item.description)
            );
        });
        
        data.sounds.forEach(item => {
            document.getElementById('sounds-container').appendChild(
                createCard(item.title, item.description)
            );
        });
        
    } catch (error) {
        console.error('Error:', error);
        // Mensagem de fallback
        document.querySelectorAll('.container').forEach(container => {
            container.innerHTML = '<p>Content failed to load. Please try again later.</p>';
        });
    }
});