const sounds = [
  { id: 'sound0', sound: 'sounds/1.mp3', label: '1' },
  { id: 'sound1', sound: 'sounds/2.mp3', label: '2' },
  { id: 'sound2', sound: 'sounds/3.mp3', label: '3' },
  { id: 'sound3', sound: 'sounds/1.mp3', label: '1' },
  { id: 'sound4', sound: 'sounds/2.mp3', label: '2' },
  { id: 'sound5', sound: 'sounds/3.mp3', label: '3' },

  /*  { id: 'sound0', sound: 'sounds/1.mp3', label: '1' },
  { id: 'sound1', sound: 'sounds/2.mp3', label: '2' },
  { id: 'sound2', sound: 'sounds/3.mp3', label: '3' },
  { id: 'sound3', sound: 'sounds/1.mp3', label: '1' },
  { id: 'sound4', sound: 'sounds/2.mp3', label: '2' },
  { id: 'sound5', sound: 'sounds/3.mp3', label: '3' }, */
];

let soundInstances = [];

let prevSoundPlace = 0;

const createNewSound = (sound) => {
  const soundInstance = new Howl({
    src: [`${sound}`],
    html5: false,
    autoplay: false,
  });
  soundInstances = [...soundInstances, soundInstance];

  return soundInstance;
};

const addSoundbuttons = () => {
  console.log(sounds);
  sounds.forEach((soundEl) => {
    const createdSound = createNewSound(soundEl.sound);

    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.id = soundEl.id;
    document.querySelector('.grid').appendChild(tile);

    //attach sound to button
    tile.addEventListener('click', () => {
      soundPlayHandler(tile, createdSound);
    });
  });
};

const stopAllSoundInstances = () => {
  // stopSounds
  soundInstances.forEach((instance) => {
    instance.stop();
  });
};

const soundPlayHandler = (tile, createdSound) => {
  //start actual sound
  createdSound.play();

  createdSound.on('play', () => {
    tile.classList.add('active');
  });

  createdSound.on('end', () => {
    tile.classList.remove('active');
  });

  createdSound.on('stop', () => {
    tile.classList.remove('active');
  });
};

const loopRandomSounds = () => {
  const playBtn = document.getElementById('btn-play');
  playBtn.addEventListener('click', () => {
    loopSoundsHandler();
    playBtn.classList.add('hide');
    stopBtn.classList.remove('hide');
  });

  const stopBtn = document.getElementById('btn-stop');
  stopBtn.addEventListener('click', () => {
    stopAllSoundInstances();
    const soundBtns = document.querySelectorAll('.tile');
    soundBtns.forEach((btn) => {
      btn.classList.remove('active');
    });

    playBtn.classList.remove('hide');
    stopBtn.classList.add('hide');
  });

  const loopSoundsHandler = () => {
    const currentSoundPlace = Math.floor(Math.random() * soundInstances.length);

    if (prevSoundPlace === currentSoundPlace) {
      loopSoundsHandler();
      console.log('prevSoundPlace = currentSoundPlace');
      return false;
    }

    prevSoundPlace = currentSoundPlace;

    const currentSoundEl = document.getElementById(`sound${currentSoundPlace}`);
    const currentSound = soundInstances[currentSoundPlace];
    currentSound.play();

    currentSound.once('play', () => {
      setTimeout(() => {
        console.log('play');
        currentSoundEl.classList.add('active');
      }, 100);
    });

    currentSound.once('end', () => {
      setTimeout(() => {
        console.log('end');
        currentSoundEl.classList.remove('active');
        loopSoundsHandler();
      }, 100);
    });
  };
};
//** FUNCTIONS END

addSoundbuttons();
//loopRandomSounds();
//pressStopButton();

loopRandomSounds();
