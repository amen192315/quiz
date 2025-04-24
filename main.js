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
  headerContainer.innerHTML = `<h2 class="title">${questions[questionIndex].question}</h2>`;

  let answerNumber = 1;
  questions[questionIndex].answers.forEach(answerText => {
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
    <h3 class="score">Ваш результат: ${score.toFixed(1)} из ${maxScore}</h3>
  `;
  submitButton.style.display = 'none';
  
  showCorrectAnswers();
}

