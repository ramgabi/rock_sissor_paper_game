window.onload = function () {

  const $startBtn = document.querySelector('.start-btn'),
    $menualBtn = document.querySelector('.menual-btn'),
    $intro = document.querySelector('.intro'),
    $exit = document.querySelector('.exit'),
    $cardList = document.querySelector('.card-list'),
    $card = $cardList.getElementsByTagName('li');

  var comNum,
    play = 0,
    firstGame = true,
    score = 0,
    bestScore = 0;


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

    document.querySelector('.win').classList.remove('show');
    document.querySelector('.draw').classList.remove('show');
    document.querySelector('.lose').classList.remove('show');

    document.querySelector('.computer-card-img').setAttribute('src', 'img/card_back.jpg');

    $card[0].style.opacity = '1';
    $card[1].style.opacity = '1';
    $card[2].style.opacity = '1';

    randomNumberGenerate();
  }

  //유저 카드선택

  function userChoice() {
    if (play === 'true') {
      for (var i = 0; i < 3; i++) {
        $card[i].num = i
        $card[i].onclick = function () {
          console.log(play)
          $card[0].style.opacity = '0';
          $card[1].style.opacity = '0';
          $card[2].style.opacity = '0';
          this.style.opacity = '1';

          play = 0;
          endGame(this.num);
        }
      }
    }else{
      return;
    }
  }


  //컴퓨터 카드선택 0~2사이

  function randomNumberGenerate() {
    comNum = Math.floor(Math.random() * (3 - 0));
    userChoice();
  }

  //게임시작

  $startBtn.onclick = function () {
    play = 'true';

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
    document.querySelector('.game-menual').style.display = 'block';
  }

  function closeMenual() {
    document.querySelector('.game-menual').style.display = 'none';
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
      document.querySelector('.best-score-num').innerText = localStorage.bestScoreNum;
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

    document.querySelector('.computer-card-img').setAttribute('src', cardSrc[comNum])
  }

  function endGame(userNum) {
    showingComCard();

    if (userNum - comNum == 0) {
      //무승부
      document.querySelector('.draw').classList.add('show');
    } else {
      if (userNum - comNum == 1 || userNum - comNum == -2) {
        //이김
        document.querySelector('.win').classList.add('show');
        score++;
        bestScoreCheck();
      } else {
        //짐
        document.querySelector('.lose').classList.add('show');
        score = 0;
      }
    }
    document.querySelector('.now-score-num').innerText = score;
  }
}