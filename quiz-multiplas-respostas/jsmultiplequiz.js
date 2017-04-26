(function() {
  var questions = [{
    question: "Questão 1",
    choices: ["1", "2"]
  }, {
    question: "Questão 2",
    choices: ["A", "B", "C"]
  }];
  
  var questionCounter = 0; //segue numero de questões
  var selections = []; //respostas do usuário Array
  var quiz = $('#quiz'); //div da quiz
  
  //mostra questão inicial
  displayNext();
  
  // Click handler para botão "proxima"
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // rava animações indevidas
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // protecão caso não ecolha nenhuma questão
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler para o botão 'voltar'
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler para o botão 'iniciar'
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // animações de hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // cria a div que contem a respostas
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // cria a lista de respostas com radio buttons
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // pega o valor da resposta escolhida e coloca na array selections
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // busca e exibe o proximo elemento
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // controles para o botão voltar aparecer após a primeira questão
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Analisa as resposta e retorna o resultado
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    var matchKit;
    var selection = selections[0] +""+selections[1];
      switch(selection) {
    case "00":
        matchKit = 'Resposta 1 e A';
        break;
    case "01":
        matchKit = 'Resposta 1 e B';
        break;    
    case "02":
        matchKit = 'Resposta 1 e C';
        break;
    case "10":
        matchKit = 'Resposta 2 e A';
        break;
    case "11":
        matchKit = 'Resposta 2 e B';
        break;
    case "12":
        matchKit = 'Resposta 2 e C';
        break;   
    default:
        matchKit = 'Sem resposta';
  }
    
    score.append('O kit certo é o: ' + matchKit + ' !');
    return score;
  }
})();