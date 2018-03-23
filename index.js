
(function($) {
  const shuffleArray = (arr) => {
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

  //Each object contains the question, an array of the possible answers, and the correct answer.
  let questions = [
    {
      text: "Which one of Daenerys' handmaidens died in The Red Waste prior to arriving in Qarth ?",
      options: ['Irri', 'Doreah', 'Jhiqui', 'Missandei'],
      answerIndexInOptions: 1
    },
    {
      text: "Which one of the nine free cities of Essos was not originally a colony of Old Valyria ?",
      options: ['Pentos', 'Braavos', 'Volantis', 'Myr'],
      answerIndexInOptions: 1
    },
    {
      text: "Who forged Robert Baratheon's warhammer?",
      options: ['Ironbelly', 'Mikken', 'Donal Noye', 'Tobho Mott'],
      answerIndexInOptions: 2
    },
    {
      text: "During one of Arya's dancing lessons, Syrio Forel talks of an exotic land with lizards with scythes for claws. What continent is he alluding to?",
      options: ['Sothoryos', 'Ulthos', 'Westeros', 'Essos'],
      answerIndexInOptions: 0
    },
    {
      text: "Who does Eddard Stark deem the greatest warrior he ever encountered?",
      options: ['Barristan Selmy', 'Gerold Hightower', 'Oswell Whent', 'Arthur Dayne'],
      answerIndexInOptions: 3
    },
    {
      text: "What house is home to Greywater Watch ?",
      options: ['House Karstark', 'House Reed', 'House Glover', 'House Tallhart'],
      answerIndexInOptions: 1
    },
    {
      text: "Who died at the hands of Catelyn Stark during the Red Wedding?",
      options: ['Aegon Frey', 'Roslin Frey', 'Joyeuse Erenford', 'Ryman Frey'],
      answerIndexInOptions: 0
    },
    {
      text: "Who attempted to kill Myrcella Baratheon in the midst of Arianne Martell's failed plan to put her on the iron throne?",
      options: ['Doran Martell', 'Areo Hotah', 'Gerold Dayne', 'Quentyn Martell'],
      answerIndexInOptions: 2
    },
    {
      text: "Who won the melee at the hand's tourney in King's Landing?",
      options: ['Beric Dondarrion', 'Loras Tyrell', 'Thoros of Myr', 'Balon Swann'],
      answerIndexInOptions: 2
    },
    {
      text: "What are the Lannister's house words?",
      options: ['Growing strong', 'Hear me roar', 'A Lannister always pays his debts', 'We do not sow'],
      answerIndexInOptions: 1
    },
  ];
  questions.shuffleOptions = () => {
    questions.forEach( el => {
      const correctAnswer = el.options[el.answerIndexInOptions];
      el.options = shuffleArray(el.options);
      el.answerIndexInOptions = el.options.indexOf(correctAnswer);
    } );
  };

  const quiz = (function() {
    const getFinalResultsString = (score, questionsCount) => {
      return `Your final score is ${score} out of ${questionsCount}.`;
    };

    const getIncorrectAnswerString = (correctAnswer) => {
      return `You should have chosen ${correctAnswer}.`;
    };

    const showPopUp = (popUp, text) => {
      $('main, header').addClass('body-transparent');
      popUp
        .fadeIn()
        .find('.pop-up-text')
        .text( text );
    };

    const hidePopUp = (popUp) => {
      $('main, header').removeClass('body-transparent');
      popUp.fadeOut('fast');
      popUp.find('pop-up-text').empty();
    };

    const setQuestionCount = (num, questionsCount) => {
      $('.current-question-div').text(
        `Questions: ${num}/${questionsCount}`
      );
    };

    const setScoreCount = (score, questionsCount) => {
      $('.current-score-div').text(
        `Score: ${score}/${questionsCount}`
      );
    };

    const setOption = (answerElem, optionIndex, optionText) => {
      $(answerElem)
        .find('input[type="radio"]')
        .prop('checked', optionIndex === 0)
        .attr( {
          'id': optionText,
          'value': optionText,
          'data-index': optionIndex,
        } );
      $(answerElem)
        .find('label')
        .attr( 'for', optionText )
        .text( optionText );
    };

    const setQuestion = (question) => {
      $('.quiz-questions').text( question.text );
      $('.answer-to-question').each(
        (index, elem) => setOption(elem, index, question.options[index])
       );
    };

    const showResults = (score, questionsCount) => {
      $('.final-results').removeClass('hidden');
      $('.final-score-paragraph').text(
        getFinalResultsString(score, questionsCount)
       );
    };

    const questionsCount = questions.length;
    let currentQuestionIndex = 0;
    let score = 0;

    return {
      start: () => {
        $('.quiz-div').removeClass('hidden');
        $('.start-page-div').addClass('hidden');
        questions = shuffleArray(questions);
        questions.shuffleOptions();
        setScoreCount( score, questionsCount );
        setQuestion( questions[currentQuestionIndex] );
        setQuestionCount( currentQuestionIndex, questionsCount );
      },
      reset: () => {
        currentQuestionIndex = 0;
        score = 0;
        $('.start-page-div').removeClass('hidden');
        $('.final-results').addClass('hidden');
      },
      handleAnswer: () => {
        const isAnswerCorrect = questions[currentQuestionIndex].answerIndexInOptions === Number(
            $('.answer-to-question input:checked').attr('data-index')
          );
        const correctAnswer =
          questions[currentQuestionIndex].options[questions[currentQuestionIndex].answerIndexInOptions];
        if ( isAnswerCorrect ) {
          showPopUp( $('.pop-outer-correct'), '' );
          score++
        }
        else {
          showPopUp(
            $('.pop-outer-incorrect'),
            getIncorrectAnswerString( correctAnswer )
          );
        }
        setScoreCount( score, questionsCount );
      },
      proceed: () => {
        currentQuestionIndex++;
        // if quiz has not ended yet
        if ( currentQuestionIndex < questionsCount ) {
          setQuestion( questions[currentQuestionIndex] );
          setQuestionCount( currentQuestionIndex, questionsCount );
        } else {
          $('.quiz-div').addClass('hidden');
          showResults( score, questionsCount );
        }
      },
      hidePopUp: hidePopUp,
    };
  })();

$(document).on( 'click', '.start-button', quiz.start );
$(document).on( 'click', '.start-over', quiz.reset );
$(document).on( 'click', '.submit-question', () => {
  quiz.handleAnswer();
  quiz.proceed();
} );
$(document).on( 'click', '.pop-outer .close', (ev) => {
  quiz.hidePopUp( $(ev.target).parents('.pop-outer') )
} );

})($);
