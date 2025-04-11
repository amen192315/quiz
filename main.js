const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitButton = document.querySelector('#submit');

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitButton.onclick = checkAnswer;

function clearPage() {
  headerContainer.innerHTML = '';
  listContainer.innerHTML = '';
}

function showQuestion() {
  // Вопрос
  headerContainer.innerHTML = `<h2 class="title">${questions[questionIndex].question}</h2>`;

  // Варианты ответов
  let answerNumber = 1; // Нумеруем с 1
  for (const answerText of questions[questionIndex].answers) {
    const answerHTML = `
        <li>
          <label>
            <input value="${answerNumber}" type="radio" name="answer" class="answer" />
            <span>${answerText}</span>
          </label>
        </li>
      `;
    listContainer.innerHTML += answerHTML;
    answerNumber++;
  }
}

function checkAnswer() {
  const checkedRadio = listContainer.querySelector(
    'input[type="radio"]:checked'
  );
  if (!checkedRadio) {
    alert('Выберите ответ!');
    return;
  }

  const userAnswer = parseInt(checkedRadio.value); // Получаем номер ответа (1, 2, 3...)
  const isCorrect = userAnswer === questions[questionIndex].correct;

  if (isCorrect) {
    score += 0.2; // Теперь score увеличивается правильно
  }

  // Переход к следующему вопросу или завершение теста
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    clearPage();
    showQuestion();
  } else {
    clearPage();
    headerContainer.innerHTML = `<h2 class="title">Тест завершён! Ваш результат: ${score} из ${questions.length}</h2>`;
    submitButton.style.display = 'none';
  }
}
