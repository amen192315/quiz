const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitButton = document.querySelector('#submit');

let score = 0;
let questionIndex = 0;

// Инициализация теста
clearPage();
showQuestion();
submitButton.onclick = checkAnswer;

function clearPage() {
  headerContainer.innerHTML = '';
  listContainer.innerHTML = '';
}

function showQuestion() {
  const currentQuestion = questions[questionIndex];
  
  // Создаем HTML для вопроса
  let questionHTML = `<h2 class="title">${currentQuestion.question}</h2>`;
  
  // Добавляем изображение, если оно есть
  if (currentQuestion.img) {
    questionHTML += `<img class = "image" src="${currentQuestion.img}" alt="Иллюстрация к вопросу" class="question-image">`;
  }
  
  headerContainer.innerHTML = questionHTML;

  // Варианты ответов
  currentQuestion.answers.forEach((answerText, index) => {
    const answerHTML = `
      <li>
        <label>
          <input value="${index + 1}" type="radio" name="answer" class="answer" />
          <span>${answerText}</span>
        </label>
      </li>
    `;
    listContainer.innerHTML += answerHTML;
  });
}

function checkAnswer() {
  const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
  
  if (!checkedRadio) {
    alert('Выберите ответ!');
    return;
  }

  const userAnswer = parseInt(checkedRadio.value);
  const isCorrect = userAnswer === questions[questionIndex].correct;

  if (isCorrect) {
    score = Number((score + 0.2).toFixed(1));
  }

  if (questionIndex < questions.length - 1) {
    questionIndex++;
    clearPage();
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  clearPage();
  const maxScore = (questions.length * 0.2).toFixed(1);
  headerContainer.innerHTML = `
    <h2 class="title">Тест завершён!</h2>
    <h3 class="score">Ваш результат: ${score.toFixed(1)} из ${maxScore} баллов</h3>
  `;
  submitButton.style.display = 'none';
  showCorrectAnswers();
}
