
(function($) {

  const shuffleArray = function shuffleArray(arr) {
    let currentIndex = arr.length;
    let temporaryValue;
    let randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
    return arr;
  };

  const quiz = (function() {
    const markUp = {
      getQuestionForm: function getQuestionForm(question) {
        let markUp =
          `<div class='quiz-div quiz-col'>
          <form class='main-quiz-form row'>
            <div role='radiogroup' aria-label='quiz-question-and-answers'>
            <p class='quiz-questions'>${question.question}</p>
            <div>`;

        question.options.forEach( (answer, index) => {
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
      getQuizResults: function getQuizResults(score, total) {
        return `<div class='row final-results'>
        <p class='final-score-paragraph'>
        Your final score is ${score} out of ${total}.
        <p>
        <button class="start-over final-score-button">Play Again</button>
        </div>`;
      },
      getIncorrectAnswerPara: function getIncorrectAnswerPara(correctAnswer) {
        return `<p class='incorrect-text'>
        You should have chosen ${correctAnswer}.
        </p>`;
      },
    };

    return {
      start: function start() {
        $('.start-page-div').addClass('hide-start-page');
      },
      reset: function reset() {
        $('main').empty();
        $('.start-page-div').removeClass('hide-start-page');
      },
      setQuestionCount: function setQuestionCount(num, total) {
        $('.current-question-div').text(
          `Question: ${num}/${total}`
        );
      },
      setScoreCount: function setScoreCount(num, total) {
        $('.current-score-div').text(
          `Score: ${num}/${total}`
        );
      },
      appendQuestion: function appendQuestion(question) {
        $('main').append(
          markUp.getQuestionForm( question )
        );
      },
      displayResults: function displayResults() {
        $('main').append(
          markUp.getQuizResults(num, total)
         );
      },
      displayPopUp: function displayPopUp(correctAnswer) {
        $('main, header').addClass('body-transparent');
        if (!correctAnswer) {
          $('.pop-outer-correct').fadeIn();
        } else {
          $('.pop-outer-incorrect')
            .fadeIn()
            .find('.pop-inner-incorrect')
            .append( markUp.getIncorrectAnswerPara(correctAnswer) );
        }
      },
    };
  })();

  (function() {
    //For a quiz app, we have an array of objects.
    //Each object contains the question, an array of the possible answers, and the correct answer.
    let questions = [
      {
        question: "Which one of Daenerys' handmaidens died in the red waste prior to arriving in Qarth?",
        options: ['Irri', 'Doreah', 'Jhiqui', 'Missandei'],
        answer: 1
      },
      {
        question: "Which one of the nine free cities of Essos was not originally a colony of Old Valyria?",
        options: ['Pentos', 'Bravoos', 'Volantis', 'Myr'],
        answer: 1
      },
      {
        question: "Who forged Robert Baratheon's warhammer?",
        options: ['Ironbelly', 'Mikken', 'Donal Noye', 'Tobho Mott'],
        answer: 2
      },
      {
        question: "During one of Arya's dancing lessons, Syrio Forel talks of an exotic land with lizards with scythes for claws. What continent is he alluding to?",
        options: ['Sorthoryos', 'Ulthos', 'Great Moraq', 'Essos'],
        answer: 0
      },
      {
        question: "Who does Eddard Stark deem the greatest warrior he ever encountered?",
        options: ['Barristan Selmy', 'Gerold Hightower', 'Oswell Whent', 'Arthur Dayne'],
        answer: 3
      },
      {
        question: "What house is home to Greywater Watch?",
        options: ['House Karstark', 'House Reed', 'House Glover', 'House Talhart'],
        answer: 1
      },
      {
        question: "Who died at the hands of Catelyn Stark during the red wedding?",
        options: ['Aegon Frey', 'Roslin Frey', 'Joyeuse Erenford', 'Ryman Frey'],
        answer: 0
      },
      {
        question: "Who attempted to kill Myrcella Baratheon in the midst of Arianne Martell's failed plan to put her on the iron throne?",
        options: ['Doran Martell', 'Areo Hotah', 'Gerold Dayne', 'Quentyn Martell'],
        answer: 2
      },
      {
        question: "Who won the melee at the hand's tourney in King's Landing?",
        options: ['Beric Dondarrion', 'Loras Tyrell', 'Thoros of Myr', 'Balon Swann'],
        answer: 2
      },
      {
        question: "What are the Lannister's house words?",
        options: ['Growing strong', 'Hear me roar', 'A Lannister always pays his debts', 'We do not sow'],
        answer: 1
      }
    ];
    questions.shuffleOptions = () => {
      questions.forEach( el => {
        const correctAnswer = el.options[el.answer];
        el.options = shuffleArray(el.options);
        el.answer = el.options.indexOf(correctAnswer);
      } );
    };

    questions = shuffleArray(questions);
    questions.shuffleOptions();

    let questionIndex = 0;
    let score = 0;

    $(document).on('submit', '.start-page-form', e => {
      e.preventDefault();
      quiz.appendQuestion( questions[questionIndex] );
      quiz.setScoreCount( score, questions.length );
      quiz.setQuestionCount( questionIndex, questions.length );
      quiz.start();
    });

    $(document).on('click', '.start-over', () => {
      questionIndex = 0;
      score = 0;
      questions = shuffleArray(questions);
      questions.shuffleOptions();
      quiz.reset();
    });

    $(document).on( 'submit', '.main-quiz-form', (e) => {
      e.preventDefault();
      const answerIsCorrect = questions[questionIndex].answer === Number(
          $('.answer-to-question input:checked').attr('data-index')
        );
      quiz.displayPopUp(
        !answerIsCorrect ? questions[questionIndex].options[questions[questionIndex].answer] : null
       );
      answerIsCorrect ? score++ : null;
      questionIndex++;
      if (questionIndex < questions.length) {
        $('.quiz-div').remove();
        // careful! this and the 'questions' variable refer to different things by now, that's why we are not using it here as well.
        quiz.appendQuestion( questions[questionIndex] );
        quiz.setScoreCount( score, questions.length );
        quiz.setQuestionCount( questionIndex, questions.length );
      } else {
        quiz.displayResults( score, questions.length );
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
