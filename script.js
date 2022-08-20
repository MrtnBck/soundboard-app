const sounds = {
  sound0: 'sounds/1.mp3',
  sound1: 'sounds/2.mp3',
  sound2: 'sounds/3.mp3',
  sound3: 'sounds/1.mp3',
  sound4: 'sounds/2.mp3',
  sound5: 'sounds/3.mp3',
};

let soundInstances = [];

let prevSoundPlace = undefined;

const createNewSound = (sound) => {
  const soundInstance = new Howl({
    src: [`${sound}`],
  });
  soundInstances = [...soundInstances, soundInstance];

  return soundInstance;
};

const addSoundbuttons = (sounds) => {
  for (const sound in sounds) {
    const createdSound = createNewSound(sounds[sound]);

    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.id = sound;
    document.querySelector('.grid').appendChild(btn);

    //attach sound to button
    btn.addEventListener('click', () => {
      soundPlayHandler(btn, createdSound);
    });
  }
};

const soundPlayHandler = (btn, createdSound) => {
  // stopSounds
  soundInstances.forEach((instance) => {
    instance.stop();
  });

  //start actual sound
  createdSound.play();

  createdSound.on('play', () => {
    btn.classList.add('active');
  });

  createdSound.on('end', () => {
    btn.classList.remove('active');
  });

  createdSound.on('stop', () => {
    btn.classList.remove('active');
  });
};

const loopRandomSounds = () => {
  const addEventListenerToButton = () => {
    const playBtn = document.getElementById('btn-play');
    playBtn.addEventListener('click', () => {
      loopSoundsHandler();
    });
  };

  const loopSoundsHandler = () => {
    let nextSound;
    let nextSoundPlace;

    nextSoundObject = randomize();
    nextSound = nextSoundObject.soundObject;
    nextSoundPlace = nextSoundObject.soundPlace;

    console.log(nextSoundPlace);
    while (prevSoundPlace === nextSoundPlace) {
      console.log('generateNew');
      nextSoundObject = randomize();
      nextSound = nextSoundObject.soundObject;
      nextSoundPlace = nextSoundObject.soundPlace;
    }

    prevSoundPlace = nextSoundPlace;

    soundInstances.forEach((instance) => {
      instance.stop();
      const btns = document.querySelectorAll('.btn');
      btns.forEach((btn) => {
        btn.classList.remove('active');
      });
    });

    nextSound.play();

    const nextSoundEl = document.getElementById(`sound${nextSoundPlace}`);

    nextSound.on('play', () => {
      setTimeout(() => {
        nextSoundEl.classList.add('active');
      }, 100);
    });

    nextSound.on('end', () => {
      setTimeout(() => {
        nextSoundEl.classList.remove('active');
        loopSoundsHandler();
      }, 100);
    });
  };

  const randomize = () => {
    const soundPlace = Math.floor(Math.random() * soundInstances.length);
    const soundObject = soundInstances[soundPlace];

    const returnObject = {
      soundPlace,
      soundObject,
    };
    return returnObject;
  };

  addEventListenerToButton();
};

//** FUNCTIONS END

addSoundbuttons(sounds);
loopRandomSounds();
