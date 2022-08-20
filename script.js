const sounds = {
  sound1: 'sounds/1.mp3',
  sound2: 'sounds/2.mp3',
  sound3: 'sounds/3.mp3',
  sound4: 'sounds/1.mp3',
  sound5: 'sounds/2.mp3',
  sound6: 'sounds/3.mp3',
};

let soundInstances = [];

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
  const soundId = createdSound.play();
  console.log(soundId);

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

//** FUNCTIONS END

addSoundbuttons(sounds);
