let mobile = 'ontouchstart' in document.documentElement;

let switchAllowed = false;

function openSocial(type) {
  let url = 'about:blank';

  switch (type) {
    case 'discord':
      url = 'https://discord.com/users/1066768225603432669';
      break;
    case 'github':
      url = 'https://github.com/raiin';
      break;
    case 'twitter':
      url = 'https://t.me/rainakhi';
      break;
  }

  window.open(url);
}

function startIntroTyping() {
  new TypeIt('#intro-text', {
    speed: 50,
  })
    .type('Welcome!', { delay: 1200 })
    .delete(null, { delay: 1000 })
    .type(`${mobile ? 'مقبض' : 'اضغط أي زر'} لاستكمال...`)
    .go();

  setTimeout(function () {
    switchAllowed = true;
  }, 2500);
}

function typerStartTyping(typer) {
  typer.reset();

  let text = ['200 جيجابايت من المحتوى', 'نشط منذ عام 2020', 'احترافي', 'تجربة مع الدولة', 'أتباع الله'];

  text.forEach(function (language, index) {
    typer.move(null);
    typer.type(language, { delay: 1000 });
    typer.pause(1000);

    typer.delete(language.length, { delay: 1000 });
  });

  typer.go();
}

function startMainTyping() {
  let typer = new TypeIt('#subtext', {
    speed: 50,
    afterComplete: async () => {
      typerStartTyping(typer);
    },
  });

  typerStartTyping(typer);
}

function switchScreen() {
  document.title = 'Edater | Home';

  $('.intro').fadeOut(1000, function () {
    $('.bg-image').fadeIn(1000);
    $('.main').fadeIn(1000, function () {
      startMainTyping();
    });
  });

  ['background'].forEach(function (audioName) {
    let fullPath = `assets/audio/${audioName}.mp3`;

    let audioElement = document.createElement('audio');
    audioElement.setAttribute('src', fullPath);
    audioElement.style.display = 'none';

    audioElement.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    });

    audioElement.play();
  });
}

document.addEventListener('keydown', function (e) {
  if (switchAllowed) {
    switchAllowed = false;
    switchScreen();
  }
});

document.addEventListener('touchstart', function (e) {
  if (switchAllowed && mobile) {
    switchAllowed = false;
    switchScreen();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  startIntroTyping();
});
