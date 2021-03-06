﻿window.onload = function () {

  console.log()

  //초기화

  const _ = document;

  const $startBtn = _.querySelector('.start-btn'),
    $menualBtn = _.querySelector('.menual-btn'),
    $intro = _.querySelector('.intro'),
    $exit = _.querySelector('.exit'),
    $cardList = _.querySelector('.card-list'),
    $card = $cardList.getElementsByTagName('li'),
    $gameMenual = _.querySelector('.game-menual')

  var comNum,
    play = true,
    firstGame = true,
    score = 0,
    bestScore = 0,
    auto;


  //게임테이블 애니메이션

  function showingTable() {

    TweenMax.to('.intro', 2, {
      paddingTop: '8vh'
    });

    TweenMax.to('.game-table', 2, {
      display: 'block',
      opacity: 1
    });
  }

  //게임재설정/초기화

  function setGame() {

    clearInterval(auto);

    for (var j = 0; j < 3; j++) {

      _.querySelectorAll('.game-message p')[j].classList.remove('show');
      _.querySelector('.auto').classList.remove('show');
      _.querySelectorAll('.card')[j].classList.remove('show');
      _.querySelectorAll('.card')[j].style.opacity = '1';
    }

    _.querySelector('.computer-card-img').setAttribute('src', 'img/card_back.jpg');

    randomNumberGenerate();
  }

  //유저 카드선택

  function userChoice() {
    for (var i = 0; i < 3; i++) {
      $card[i].num = i
      $card[i].onclick = function () {
        if (play) {
          for (var j = 0; j < 3; j++) {
            _.querySelectorAll('.card')[j].style.opacity = '0';
          }
          this.style.opacity = '1';
          play = false;
          endGame(this.num);
        }
      }
    }
  }


  //컴퓨터 카드선택 0~2사이

  function randomNumberGenerate() {
    comNum = Math.floor(Math.random() * (3 - 0));
    userChoice();
  }

  //게임시작

  $startBtn.onclick = function () {
    
    clearInterval(auto);
    play = true;

    if (firstGame) {
      showingTable();
      randomNumberGenerate();

      firstGame = false;

    } else {
      setGame();
    }
  }

  //게임설명

  function openMenual() {
    $gameMenual.style.display = 'block';
  }

  function closeMenual() {
    $gameMenual.style.display = 'none';
  }

  $menualBtn.onclick = function () {
    openMenual();
  }

  $exit.onclick = function () {
    closeMenual();
  }

  //연승 체크

  bestScoreAdd();

  function bestScoreAdd() {
    if (localStorage.bestScoreNum) {
      _.querySelector('.best-score-num').innerText = localStorage.bestScoreNum;
      bestScore = localStorage.bestScoreNum;
    }
  }

  function bestScoreCheck() {
    if (score > bestScore) {
      localStorage.setItem("bestScoreNum", score);
      bestScoreAdd();
    }
  }

  //정답 체크

  function showingComCard() {
    const cardSrc = ['img/sissor_card.jpg', 'img/rock_card.jpg', 'img/paper_card.jpg']

    _.querySelector('.computer-card-img').setAttribute('src', cardSrc[comNum])
  }

  function endGame(userNum) {
    showingComCard();
    autoStart();

    if (userNum - comNum == 0) {
      //무승부
      _.querySelector('.draw').classList.add('show');
    } else {
      if (userNum - comNum == 1 || userNum - comNum == -2) {
        //이김
        _.querySelector('.win').classList.add('show');
        score++;
        bestScoreCheck();
      } else {
        //짐
        _.querySelector('.lose').classList.add('show');
        score = 0;
      }
    }
    _.querySelector('.now-score-num').innerText = score;
  }

  //자동시작

  function autoStart() {
    
    var timeNum = 5
    
    play = true;
    auto = setInterval(function(){
      _.querySelector('.auto').classList.add('show');
      _.querySelector('.time').innerText = timeNum--;
    }, 1000)
    setTimeout(setGame, 6000)
  }
}
