let selectedLesson = null;

function addEventListeners() {
    const lessons = document.querySelectorAll('.lessons .btn');
    lessons.forEach(lesson => {
        lesson.addEventListener('click', function() {
            selectedLesson = this.id.replace('lesson-', '');
            console.log('Selected Lesson:', selectedLesson);
            showCardsForLesson(selectedLesson);
        });
    });
}

function showCardsForLesson(lessonId) {
    const tempDiv = document.querySelector('.temp');
    if (tempDiv) tempDiv.style.display = 'none';

    // Clear previous cards
    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = '';

    // Fetch and show new cards
    getCardInfo(lessonId);
}

addEventListeners();

// Remove this line so cards don't show on page load
// getCardInfo(1);

function getCardInfo(id) {
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log('Card Info:', data['data']);
            for (let i = 0; i < Math.min(6, data['data'].length); i++) {
                createCard(data['data'][i]['word'], data['data'][i]['meaning'], data['data'][i]['bangla']);
            }
        })
        .catch(error => {
            console.error('Error fetching card info:', error);
        });
}

function createCard(word, meaning, bangla) {
    const cardsContainer = document.querySelector('.cards');
    const card = document.createElement('div');
    card.className = 'card w-96 bg-base-100 card-xl shadow-sm m-4'; // Add margin for spacing
    card.innerHTML = `
        <div class="card-body text-center">
            <h2>${word}</h2>
            <h3 class="font-bangla">${meaning}</h3>
            <h3 class="mt-2 font-bangla">${bangla}</h3>
            <div class="flex justify-between">
                <i class="fa-solid fa-circle-info"></i>
                <i class="fa-solid fa-volume-high"></i>
            </div>
        </div>
    `;
    cardsContainer.appendChild(card);
    card.addEventListener('click', function(){
        const modal = document.getElementById('my_modal_5');
        if(modal){
            const divWord = modal.querySelector('#word');
            const divMeaning = modal.querySelector('#meaning');
            const divBangla = modal.querySelector('#bangla');
            divWord.textContent = word;
            divMeaning.textContent = meaning;
            divBangla.textContent = bangla;
            modal.showModal();
        }
    })
}