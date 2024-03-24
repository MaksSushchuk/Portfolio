const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
    document.body.style.overflow = '';
});
menu.addEventListener('click',(e)=>{
    if(e.target.classList.contains('menu__overlay')){
        menu.classList.remove('active');
        document.body.style.overflow = '';
    }
})

document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        faculty: document.getElementById('faculty').value,
        stream: document.querySelector('input[name="stream"]:checked')?.value,
        groups: [
            document.getElementById('group1').checked ? 'A' : null,
            document.getElementById('group2').checked ? 'B' : null,
            document.getElementById('group3').checked ? 'C' : null,
        ].filter(Boolean),
        interviewDate: document.getElementById('interviewDate').value,
        interviewTime: document.getElementById('interviewTime').value,
        interviewWeek: document.getElementById('interviewWeek').value,
        averageScore: parseFloat(document.getElementById('averageScore').value),
    };

    let surveyData = JSON.parse(localStorage.getItem('surveyData')) || [];
    surveyData.push(formData);
    localStorage.setItem('surveyData', JSON.stringify(surveyData));

    alert('Ваші відповіді були збережені.');
    this.reset();
});

function filterByFaculty(faculty) {
    const surveyData = JSON.parse(localStorage.getItem('surveyData')) || [];
    return surveyData.filter(participant => participant.faculty === faculty);
}

function filterByInterviewDateTime(date, time) {
    const surveyData = JSON.parse(localStorage.getItem('surveyData')) || [];
    return surveyData.filter(participant => participant.interviewDate === date && participant.interviewTime === time);
}

function filterByAverageScore(min, max) {
    const surveyData = JSON.parse(localStorage.getItem('surveyData')) || [];
    return surveyData.filter(participant => participant.averageScore >= min && participant.averageScore <= max);
}

document.getElementById('filterByFacultyBtn').addEventListener('click', function() {
    const participants = filterByFaculty('engineering'); 
    alert(formatParticipants(participants));
});

document.getElementById('filterByDateTimeBtn').addEventListener('click', function() {
    const participants = filterByInterviewDateTime('2023-03-15', '10:00');
    alert(formatParticipants(participants));
});

document.getElementById('filterByScoreBtn').addEventListener('click', function() {
    const participants = filterByAverageScore(3, 40); 
    alert(formatParticipants(participants));
});

function formatParticipants(participants) {
    if (participants.length === 0) return "Учасників не знайдено.";
    return participants.map(p => `Факультет: ${p.faculty}, Потік: ${p.stream}, Групи: ${p.groups.join(', ')}, Дата співбесіди: ${p.interviewDate}, Час: ${p.interviewTime}, Середній бал: ${p.averageScore}`).join('\n');
}
