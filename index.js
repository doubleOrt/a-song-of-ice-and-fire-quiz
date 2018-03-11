
(function($) {

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  const markUp = {
    questionForm: function getQuestionForm(question) {
        let markUp =
          `<div class='quiz-div quiz-col'>
          <form class='main-quiz-form row'>
            <div role='radiogroup' aria-label='quiz-question-and-answers'>
            <p class='quiz-questions'>${question.question}</p>
            <div>`;

        question.choices.forEach( (answer, index) => {
          markUp +=
            `<div class="answer-to-question">
              <input type="radio" id=${answer}
              name="answer" value=${answer} data-index=${index}
              ${ index == 0 ? 'required' : null } >
              <label for=${answer}>${answer}</label>
            </div>`;
        } );

        markUp +=
        `<div class="answer-to-question hidden">
              <input class ='the-correct-answer' type="radio" id='is${question.answer}'
              name="answer" value=${question.answer}>
              <label for=${question.answer}>${question.answer}</label>
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
        </div> `;

        return markUp;
    },
    quizResults: function quizResults(score, total) {
      return `<div class='row final-results'>
      <p class='final-score-paragraph'>
      Your final score is ${score} out of ${total}.
      <p>
      <button class="start-over final-score-button">Play Again</button>
      </div>`;
    },
    incorrectAnswerPara: function incorrectAnswerPara(correctAnswer) {
      return `<p class='incorrect-text'>
      You should have chosen ${correctAnswer}.
      </p>`;
    },
  };

  //This function will check to see if the answer is right or wrong and return that info.
  //Depending on if the answer was right or wrong, a different pop-up image will be displayed.
  function evaluateAnswer(question, userAnswer) {
    if (question.answer === userAnswer) {
      return true;
    }
    return false;
  }

  // side-effecting functions:

  function setQuestionsCountText(num, total) {
    $('.current-question-div').text(
      `Question: ${num}/${total}`
    );
  }

  function setScoreCountText(num, total) {
    $('.current-score-div').text(
      `Score: ${num}/${total}`
    );
  }

  function showScore(num, total) {
    $('main').append(
      markUp.quizResults(num, total)
     );
  }

  function addQuestion(question) {
    $('main').append(
      markUp.questionForm( question )
    );
  }

  function showPopUp(answerIsCorrect, correctAnswer) {
    $('main, header').addClass('body-transparent');
    if (answerIsCorrect) {
      $('.pop-outer-correct').fadeIn();
    } else {
      $('.pop-inner-incorrect').append(
        markUp.incorrectAnswerPara(correctAnswer)
      );
      $('.pop-outer-incorrect').fadeIn();
    }
  }

  (function() {
    //For a quiz app, we have an array of objects.
    //Each object contains the question, an array of the possible answers, and the correct answer.
    let questionsAndAnswers = [
      {
        question: "Which one of Daenerys' handmaidens died in the red waste prior to arriving in Qarth?",
        choices: ['Irri', 'Doreah', 'Jhiqui', 'Missandei'],
        answer: 1
      },
      {
        question: "Which one of the nine free cities of Essos was not originally a colony of Old Valyria?",
        choices: ['Pentos', 'Bravoos', 'Volantis', 'Myr'],
        answer: 1
      },
      {
        question: "Who forged Robert Baratheon's warhammer?",
        choices: ['Ironbelly', 'Mikken', 'Donal Noye', 'Tobho Mott'],
        answer: 2
      },
      {
        question: "During one of Arya's dancing lessons, Syrio Forel talks of an exotic land with lizards with scythes for claws. What continent is he alluding to?",
        choices: ['Sorthoryos', 'Ulthos', 'Great Moraq', 'Essos'],
        answer: 0
      },
      {
        question: "Who does Eddard Stark deem the greatest warrior he ever encountered?",
        choices: ['Barristan Selmy', 'Gerold Hightower', 'Oswell Whent', 'Arthur Dayne'],
        answer: 3
      },
      {
        question: "What house is home to Greywater Watch?",
        choices: ['House Karstark', 'House Reed', 'House Glover', 'House Talhart'],
        answer: 1
      },
      {
        question: "Who died at the hands of Catelyn Stark during the red wedding?",
        choices: ['Aegon Frey', 'Roslin Frey', 'Joyeuse Erenford', 'Ryman Frey'],
        answer: 0
      },
      {
        question: "Who attempted to kill Myrcella Baratheon in the midst of Arianne Martell's failed plan to put her on the iron throne?",
        choices: ['Doran Martell', 'Areo Hotah', 'Gerold Dayne', 'Quentyn Martell'],
        answer: 2
      },
      {
        question: "Who won the melee at the hand's tourney in King's Landing?",
        choices: ['Beric Dondarrion', 'Loras Tyrell', 'Thoros of Myr', 'Balon Swann'],
        answer: 2
      },
      {
        question: "What are the Lannister's house words?",
        choices: ['Growing strong', 'Hear me roar', 'A Lannister always pays his debts', 'We do not sow'],
        answer: 1
      }
    ];
    questionsAndAnswers.shuffleEverything = function() {
      // can't re-assign this so decided to just refer to the variable directly everywhere to avoid confusion
      questionsAndAnswers = shuffle(questionsAndAnswers);
      questionsAndAnswers.forEach( (el) => {
        const correctAnswer = el.choices[el.answer];
        el.choices = shuffle(el.choices);
        el.answer = el.choices.indexOf(correctAnswer);
      } )
    };

    questionsAndAnswers.shuffleEverything();

    let currentQuestionIndex = 0;
    let currentScore = 0;

    function startQuiz() {
      $('.start-page-div').addClass('hide-start-page');
      addQuestion( questionsAndAnswers[currentQuestionIndex] );
    }

    function resetQuiz() {
      questionsAndAnswers.shuffleEverything();
      currentQuestionIndex = 0;
      currentScore = 0;
      $('main').empty();
      $('.start-page-div').removeClass('hide-start-page');
    }

    $(document).on('submit', '.start-page-form', (e) => {
      e.preventDefault();
      startQuiz();
    });

    $(document).on('click', '.start-over', resetQuiz);

    $(document).on( 'submit', '.main-quiz-form', (e) => {
      e.preventDefault();
      const question = questionsAndAnswers[currentQuestionIndex];
      const answerIsCorrect = evaluateAnswer(
        question,
        Number( $('.answer-to-question input:checked').attr('data-index') )
      );
      showPopUp( answerIsCorrect, question.choices[question.answer] );
      answerIsCorrect ? currentScore++ : null;
      setScoreCountText(currentScore, questionsAndAnswers.length);

      currentQuestionIndex++;
      setQuestionsCountText(currentQuestionIndex);
      $('.quiz-div').remove();
      if (currentQuestionIndex < questionsAndAnswers.length) {
        // careful! this and the 'questions' variable refer to different things by now, that's why we are not using it here as well.
        addQuestion( questionsAndAnswers[currentQuestionIndex] );
      } else {
        showScore( currentScore, questionsAndAnswers.length );
      }
    });

    $(document).on('click', '.pop-outer-correct .close', () => {
      $('main, header').removeClass('body-transparent');
      $('.pop-outer-correct').fadeOut('fast');
    });

    $(document).on('click', '.pop-outer-incorrect .close', () => {
      $('main, header').removeClass('body-transparent');
      $('.pop-outer-incorrect').fadeOut('fast');
      $('.pop-inner-incorrect').find('.incorrect-text').remove();
    });

  })();

})($);
