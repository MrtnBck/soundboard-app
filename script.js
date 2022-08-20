const sounds = {
  sound0: 'sounds/1.mp3',
  sound1: 'sounds/2.mp3',
  sound2: 'sounds/3.mp3',
  sound3: 'sounds/1.mp3',
  sound4: 'sounds/2.mp3',
  sound5: 'sounds/3.mp3',
};

let soundInstances = [];

let prevSoundPlace = 0;

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

const stopAllSoundInstances = () => {
  // stopSounds
  soundInstances.forEach((instance) => {
    instance.stop();
  });
};

const soundPlayHandler = (btn, createdSound) => {
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
    const currentSoundObject = randomize();
    const currentSound = currentSoundObject.soundObject;
    const currentSoundPlace = currentSoundObject.soundPlace;
    console.log({ prev: prevSoundPlace, current: currentSoundPlace });

    if (prevSoundPlace === currentSoundPlace) {
      prevSoundPlace = currentSoundPlace;
      console.log('return false');
      loopSoundsHandler();
      return false;
    }

    prevSoundPlace = currentSoundPlace;

    stopAllSoundInstances();
    console.log('stop');
    currentSound.play();

    const currentSoundEl = document.getElementById(`sound${currentSoundPlace}`);
    console.log(currentSoundEl);

    currentSound.on('play', () => {
      setTimeout(() => {
        console.log('play');
        currentSoundEl.classList.add('active');
      }, 100);
    });

    console.log('after play');
    currentSound.on('end', () => {
      setTimeout(() => {
        console.log('end');
        currentSoundEl.classList.remove('active');
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

const pressStopButton = () => {
  const stopBtn = document.getElementById('btn-stop');

  stopBtn.addEventListener('click', () => {
    stopAllSoundInstances();
    const soundBtns = document.querySelectorAll('.btn');
    soundBtns.forEach((btn) => {
      btn.classList.remove('active');
    });
  });
};

//** FUNCTIONS END

addSoundbuttons(sounds);
loopRandomSounds();
pressStopButton();
