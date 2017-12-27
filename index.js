const STORE = {
  questionNumber: 0,
  score: 0,
  correctImage: "https://media.giphy.com/media/l1KuhBCqxOoJyr0m4/giphy.gif",
  incorrectImage: "https://media.giphy.com/media/3ohuAxV0DfcLTxVh6w/giphy.gif",
  questions: [
    {
      question: "In what year did Star Wars come out?",
      answers: [
        '1979',
        '1981',
        '1977',
        '1975'
      ],
      correctAnswer: 2
    },
    {
      question: "Who was the actor inside of R2D2?",
      answers: [
        'Kenny Baker',
        'Peter Mayhew',
        'David Prowse',
        'Rick Baker'
      ],
      correctAnswer: 0
    },
    {
      question: "Where did Darth Vader reveal himself to be Lukes father?",
      answers: [
        'Dagobah',
        'The Death Star',
        'Endor',
        'Cloud city'
      ],
      correctAnswer: 3
    },
    {
      question: "What command was given to turn the clones to the Darkside?",
      answers: [
        'Order 60',
        'Order 66',
        'Order 76',
        'Order 78'
      ],
      correctAnswer: 1
    },
    {
      question: "What was Princess Leia's Last name?",
      answers: [
        'Organa',
        'Fisher',
        'Antilles',
        'Amidala'
      ],
      correctAnswer: 0
    },
    {
      question: "What fatal flaw did the Rebels exploit to destroy the first Death Star?",
      answers: [
        'An unstable nuclear reactor core',
        'Incomplete structural support',
        'An exposed Thermal exhaust port',
        'An unstable hypermatter reactor'
      ],
      correctAnswer: 2
    },
    {
      question: "Who said, Aren't you a little short for a Stormtrooper?",
      answers: [
        'The Emperor',
        'Admiral Motti',
        'Luke Skywalker',
        'Princess Leia'
      ],
      correctAnswer: 3
    },
    {
      question: "While filming The Empire Strikes Back, which actor wasn't sure if he or she would return for a third movie?",
      answers: [
        'Mark Hamill',
        'Harrison Ford',
        'James Earl Jones',
        'Carrie Fisher'
      ],
      correctAnswer: 1
    },
    {
      question: "In Return of The Jedi, Luke Skywalker's lightsaber was green, what color was it in the first two movies?",
      answers: [
        'Purple',
        'Green',
        'Red',
        'Blue'
      ],
      correctAnswer: 3
    },
    {
      question: "What micro-organisms are said to be conductors of the Force?",
      answers: [
        'Midichlorians',
        'Chlorimidians',
        'Endochlorians',
        'Cryomidians'
      ],
      correctAnswer: 0
    }
  ]
};

// hidden when the introPage is active
$('#singleQuestion').toggleClass('hidden');
$('#progress').toggleClass('hidden');
$('#startOver').toggleClass('hidden');
$('#notify').toggleClass('hidden');
$('.questions').toggleClass('hidden');
$('.imageNotifications').toggleClass('hidden');

function startQuiz() {
  $('audio').trigger('pause');
  $('#introPage').toggleClass('hidden');
  $('#image').toggleClass('hidden');
  $('#beginGame').toggleClass('hidden');
  $('#form').toggleClass('hidden');
  $('#singleQuestion').removeClass('hidden');
  $('#progress').removeClass('hidden');
  $('.results').removeClass('hidden'); /* shows the correct score */
  $('.imageNotifications').toggleClass('hidden');
  $('.imageNotifications').removeClass('hidden');
  // $('#mostImpressive').toggleClass('hidden');
  // $('#muchToLearn').toggleClass('hidden');

  displayQuestion();
}

function nextQuestion() {
  if (STORE.questionNumber >= 10) {
    showEndResults();
  } else {
    $('.questions').toggleClass('hidden');
    $('#notify').toggleClass('hidden');
    $('.nextQuestion').toggleClass('hidden');
    // $('#mostImpressive').removeClass('hidden');
    // $('#muchToLearn').removeClass('hidden');
    // $('#Reset').toggleClass('hidden');
    displayQuestion();
  }
}

function showEndResults() {
  $('#notify').toggleClass('hidden');
  $('.nextQuestion').toggleClass('hidden');
  $('#reset').toggleClass('hidden');
  $('.imageNotifications').toggleClass('hidden');
  $('.resultsContainer').toggleClass('hidden');
  $('#correct').html(STORE.score);
  $('#Score').html(STORE.score);
  // console.log('this is where we put the end results');
}

function resetQuiz() {
  STORE.questionNumber = 0;
  STORE.score = 0;
  $('audio').trigger('resume');
  // how do I make it restart the song?
  $('#reset').toggleClass('hidden');
  // $('#reset').removeClass('hidden');
  $('#introPage').toggleClass('hidden');
  $('#progress').toggleClass('hidden');
  $('#image').toggleClass('hidden');
  $('.resultsContainer').toggleClass('hidden');
  $('.results').toggleClass('hidden');
  $('#form').toggleClass('hidden');
}

//Display the current question
function displayQuestion() {
    let question = STORE.questions[STORE.questionNumber].question;
    let answers = STORE.questions[STORE.questionNumber].answers;
    let questionNumber = STORE.questionNumber + 1;
    let score = STORE.score;

    $('.questions').removeClass('hidden');
    $('input[name="answers"]').attr('checked', false);
    $('#yodaDarth').removeClass('hidden');
    $(".imageNotifications").toggleClass('hidden');
  	$('#singleQuestion').html(question);
    $('#number').html(questionNumber);
    $('#choice0').html(answers[0]);
    $('#choice1').html(answers[1]);
    $('#choice2').html(answers[2]);
    $('#choice3').html(answers[3]);
    showResults();
}

// if answer is correct, it triggers function handleCorrectAnswer
function handleCorrectAnswer(currentQuestion, selectedAnswer) {
  $('.questions').toggleClass('hidden');
  $('.nextQuestion').toggleClass('hidden');
  $('#notify').html(`Correct!`);
  $('#notify').removeClass('hidden');
  $('#yodaDarth').attr("src", STORE.correctImage);
  $(".imageNotifications").toggleClass('hidden');
}

// if answer is incorrect, it triggers function handleIncorrectAnswer
function handleIncorrectAnswer(currentQuestion) {
  let correctAnswer = currentQuestion.answers[currentQuestion.correctAnswer];
  $('.questions').toggleClass('hidden');
  $('.nextQuestion').toggleClass('hidden');
  $('#notify').html(`Incorrect! The correct answer is "${correctAnswer}"`);
  $('#notify').removeClass('hidden');
  $('#yodaDarth').attr("src", STORE.incorrectImage);
  $(".imageNotifications").toggleClass('hidden');
}

// Once answer has been checked raise score if correct and move to next question even if incorrect
function checkAnswer(answer) {
  if ( !$("input[name='answers']:checked").val() ) {
   alert('Nothing is checked!');
 } else {
     $('#notify').toggleClass('hidden');
     let currentQuestion = STORE.questions[STORE.questionNumber];
     let selectedAnswer = STORE.questions[STORE.questionNumber].correctAnswer.toString();
     if (selectedAnswer === answer) {
       STORE.score++;
       STORE.questionNumber++;
       handleCorrectAnswer(currentQuestion, selectedAnswer);
     } else {
       STORE.questionNumber++;
       handleIncorrectAnswer(currentQuestion, selectedAnswer);
     }
 }
}

// Shows scores
function showResults() {
  $('#Score').html(STORE.score);
}

// Triggers the click events
function initializeApp() {
  $('#beginGame').click( function() {
      startQuiz();
    });
  $('#submit').click( function(event) {
      event.preventDefault();
      let checked = $('input[name=answers]:checked', '#form').val();
      checkAnswer(checked);
    });
  $('.nextQuestion').click( function() {
      nextQuestion();
    });
  $('#reset').click( function() {
      resetQuiz();
    });
}


$(initializeApp);
