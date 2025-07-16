document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('phasmo-media-section/data/media.json');
        if (!response.ok) throw new Error('Failed to load');
        const data = await response.json();

        const createCard = (title, desc) => `
            <div class="card">
                <div class="card-content">
                    <h3>${title}</h3>
                    <p>${desc}</p>
                </div>
            </div>
        `;

        // Preenche as seções
        data.photos?.forEach(item => {
            document.getElementById('photos-container')
                .insertAdjacentHTML('beforeend', createCard(item.title, item.description));
        });

        data.videos?.forEach(item => {
            document.getElementById('videos-container')
                .insertAdjacentHTML('beforeend', createCard(item.title, item.description));
        });

        data.sounds?.forEach(item => {
            document.getElementById('sounds-container')
                .insertAdjacentHTML('beforeend', createCard(item.title, item.description));
        });

    } catch (error) {
        console.error('Error:', error);
        // Fallback visual
        document.querySelectorAll('.container').forEach(el => {
            el.innerHTML = '<p>Evidências paranormais carregando...</p>';
        });
    }
});
