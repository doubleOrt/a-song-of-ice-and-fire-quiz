//For a quiz app, we have an array of objects.
//Each object contains the question, an array of the possible answers, and the correct answer.
const questionsAndAnswers = [
    {
      question: "Which one of Daenerys' handmaidens died in the red waste prior to arriving in Qarth?",
      choices: ['Irri', 'Doreah', 'Jhiqui', 'Missandei'],
      answer: 'Doreah'
    },
    {
      question: "Which one of the nine free cities of Essos was not originally a colony of Old Valyria?",
      choices: ['Pentos', 'Bravoos', 'Volantis', 'Myr'],
      answer: 'Bravoos'
    },
    {
      question: "Who forged Robert Baratheon's warhammer?",
      choices: ['Ironbelly', 'Mikken', 'Donal Noye', 'Tobho Mott'],
      answer: 'Donal Noye'
    },
    {
      question: "During one of Arya's dancing lessons, Syrio Forel talks of an exotic land with lizards with scythes for claws. What continent is he alluding to?",
      choices: ['Sorthoryos', 'Ulthos', 'Great Moraq', 'Essos'],
      answer: 'Sorthoryos'
    },
    {
      question: "Who does Eddard Stark deem the greatest warrior he ever encountered?",
      choices: ['Barristan Selmy', 'Gerold Hightower', 'Oswell Whent', 'Arthur Dayne'],
      answer: 'Arthur Dayne'
    },
    {
      question: "What house is home to Greywater Watch?",
      choices: ['House Karstark', 'House Reed', 'House Glover', 'House Talhart'],
      answer: 'House Reed'
    },
    {
      question: "Who died at the hands of Catelyn Stark during the red wedding?",
      choices: ['Aegon Frey', 'Roslin Frey', 'Joyeuse Erenford', 'Ryman Frey'],
      answer: 'Aegon Frey'
    },
    {
      question: "Who attempted to kill Myrcella Baratheon in the midst of Arianne Martell's failed plan to put her on the iron throne?",
      choices: ['Doran Martell', 'Areo Hotah', 'Gerold Dayne', 'Quentyn Martell'],
      answer: 'Gerold Dayne'
    },
    {
      question: "Who won the melee at the hand's tourney in King's Landing?",
      choices: ['Beric Dondarrion', 'Loras Tyrell', 'Thoros of Myr', 'Balon Swann'],
      answer: 'Thoros of Myr'
    },
    {
      question: "What are the Lannister's house words?",
      choices: ['Growing strong', 'Hear me roar', 'A Lannister always pays his debts', 'We do not sow'],
      answer: 'Hear me roar'
    }
  ];
  
  //This function is responsible for generating the form that each question will use.
  //First will be the question, followed by four radio inputs with each possible answer,
  //and a hidden radio input at the bottom with the correct answer
function generateQuestionForm(i) {
  const answerOne = questionsAndAnswers[i].choices[0];
  const answerTwo= questionsAndAnswers[i].choices[1];
  const answerThree = questionsAndAnswers[i].choices[2];
  const answerFour = questionsAndAnswers[i].choices[3];
  const theCorrectAnswer = questionsAndAnswers[i].answer;
  $('main').append(`<div class='quiz-div quiz-col'>
      <form class='main-quiz-form row'>
        <div role='radiogroup' aria-label='quiz-question-and-answers'>
        <p class='quiz-questions'>${questionsAndAnswers[i].question}</p>
        <div>
          <div class="answer-to-question"> 
            <input type="radio" id=${answerOne}
            name="answer" value=${answerOne} required>
            <label for=${answerOne}>${answerOne}</label>
          </div>
          
          <div class="answer-to-question">
            <input type="radio" id=${answerTwo}
            name="answer" value=${answerTwo}>
            <label for=${answerTwo}>${answerTwo}</label>
          </div>
          
          <div class="answer-to-question">
            <input type="radio" id=${answerThree}
            name="answer" value=${answerThree}>
            <label for=${answerThree}>${answerThree}</label>
          </div>
          
          <div class="answer-to-question">
            <input type="radio" id=${answerFour}
            name="answer" value=${answerFour}>
            <label for=${answerFour}>${answerFour}</label>
          </div>
          
           <div class="answer-to-question hidden">
            <input class ='the-correct-answer' type="radio" id='is${theCorrectAnswer}'
            name="answer" value=${theCorrectAnswer}>
            <label for=${theCorrectAnswer}>${theCorrectAnswer}</label>
          </div>
        </div>
        </div>
        <div class='submit-div'>
          <button type="submit" class='submit-question'>Submit answer</button>
        </div>
        <div class='score-and-question'>
        <div class='current-question-div'>
        
        </div>
        <div class='current-score-div'>
      
        </div>
      </div>  
      </form>
    </div> `);
}

//This function will remove the start page when the user clicks on the start button
function removeStartPage() {
    $('.start-page-div').addClass('hide-start-page');
}

//This function will generate the first question once the start page has been removed.
//Once the user submits an answer, it will call on another function to evaluate the answers.
//The user will then be prompted to answer each subsequent question until the end.
//Then, the final results will be displayed.
function handleSubmitQuestion(currentQuestionIndex, currentScore=0) {
  let currentQuestion = currentQuestionIndex + 1;
  
  if (currentQuestionIndex < questionsAndAnswers.length) {
  generateQuestionForm(currentQuestionIndex);
  $('.current-question-div').text(`Question: ${currentQuestion}/${questionsAndAnswers.length}`);
  $('.current-score-div').text(`Score: ${currentScore}/${questionsAndAnswers
     .length}`);
  $('.main-quiz-form').submit( function(event) {
    event.preventDefault();
    currentScore += evaluateAnswer(currentQuestionIndex);
    $('.current-question-div').text(`Question: ${currentQuestion}/${questionsAndAnswers.length}`);
    currentQuestionIndex++;
    handleSubmitQuestion(currentQuestionIndex, currentScore);
    });
  }
  if (currentQuestionIndex === questionsAndAnswers.length) {
    displayResults(currentScore);
  }

}

//This function will check to see if the answer is right or wrong and return that info.
//Depending on if the answer was right or wrong, a different pop-up image will be displayed.
function evaluateAnswer(currentQuestionIndex) {
     let rightOrWrong = 0;
     if ($("input[type='radio']:checked").val() === $('.the-correct-answer').val()) {
        rightOrWrong = 1;
        $('.quiz-div').empty();
        $('main, header').addClass('body-transparent');
        $('.pop-outer-correct').fadeIn();
        $('.close').on('click', function(event) {
        $('main, header').removeClass('body-transparent');
        $('.pop-outer-correct').fadeOut('fast');
      });
    } else {
        $('.quiz-div').empty();
        
        $('.pop-inner-incorrect').append(`<p class='incorrect-text'>You should have chosen ${questionsAndAnswers[currentQuestionIndex].answer}.</p>`);
        $('main, header').addClass('body-transparent');
        $('.pop-outer-incorrect').fadeIn();
        $('.close').on('click', function(event) {
        $('main, header').removeClass('body-transparent');
        $('.pop-outer-incorrect').fadeOut('fast');
        $('.pop-inner-incorrect').find('.incorrect-text').remove();
      });
    }
    return rightOrWrong;
}

//When this function is called, users will be taken back to the start page.
function startOver() {
  // This function should take users back to the beginning
  $('.start-over').on('click', function(event) {
    $('main').empty();
    $('.start-page-div').removeClass('hide-start-page');
  });
}

//This function will display the user's results and give them the option to start over.
function displayResults(currentScore) {
  $('main').append(`<div class='row final-results'><p class='final-score-paragraph'>Your final score is ${currentScore} out of ${questionsAndAnswers.length}.<p><button class="start-over final-score-button">Play Again</button></div>`);
  startOver();
}

//This function will start the quiz upon pressing the start button.
function startQuiz() {
  $('.start-page-form').submit( function(event) {
  event.preventDefault();
  removeStartPage();
  handleSubmitQuestion(0);
  });
  
}

$(startQuiz);




