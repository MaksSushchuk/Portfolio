const testData = {
    testName: "Тест по WEB дизайну",
    questions: [
        {
            question: "Вкажіть тег для блоку?",
            answers: [
                { answer: "a", isCorrect: false },
                { answer: "div", isCorrect: true },
                { answer: "img", isCorrect: false },
                { answer: "p", isCorrect: false }
            ],
        },
        {
            question: "Вкажіть тег для гіперпосилання?",
            answers: [
                { answer: "a", isCorrect: true },
                { answer: "div", isCorrect: false },
                { answer: "span", isCorrect: false },
                { answer: "p", isCorrect: false }
            ],
        },
        {
            question: "Який атрибут задає URL в тегу a?",
            answers: [
                { answer: "href", isCorrect: true },
                { answer: "src", isCorrect: false },
                { answer: "type", isCorrect: false },
                { answer: "style", isCorrect: false }
            ],
        },
        {
            question: "Який тег використовується для створення списку, що нумерується?",
            answers: [
                { answer: "ul", isCorrect: false },
                { answer: "ol", isCorrect: true },
                { answer: "dl", isCorrect: false },
                { answer: "list", isCorrect: false }
            ],
        },
        {
            question: "Який тег використовується для вставки зображення?",
            answers: [
                { answer: "img", isCorrect: true },
                { answer: "image", isCorrect: false },
                { answer: "src", isCorrect: false },
                { answer: "media", isCorrect: false }
            ],
        }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('testContainer');
    testData.questions.forEach((q, index) => {
        const questionBlock = document.createElement('div');
        questionBlock.className = 'question';
        questionBlock.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
        
        const answersList = document.createElement('ul');
        answersList.className = 'answers';
        
        q.answers.forEach((a, answerIndex) => {
            const answerItem = document.createElement('li');
            answerItem.innerHTML = `<label><input type="radio" name="question${index}" value="${a.isCorrect}"> ${a.answer}</label>`;
            answersList.appendChild(answerItem);
        });
        
        questionBlock.appendChild(answersList);
        container.appendChild(questionBlock);
    });
    
    document.getElementById('submitTest').addEventListener('click', function() {
        const answers = document.querySelectorAll('input[type="radio"]:checked');
        let correctCount = 0;
        answers.forEach(answer => {
            if (answer.value === 'true') correctCount++;
        });
        
        const result = document.getElementById('testResult');
        result.textContent = `Ваш результат: ${correctCount} з ${testData.questions.length}`;
    });
});

