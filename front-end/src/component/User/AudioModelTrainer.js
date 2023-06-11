import React, { useEffect, useState } from 'react';

const AudioModelTrainer = () => {
  const [word, setWord] = useState('');

  const [consoleLogs, setConsoleLogs] = useState([]);

  const nSamples = 10;

  const [numSec, setnumSec] = useState(10);

  useEffect(() => {
      document.getElementById('console').innerHTML = consoleLogs.join('<br/>');
  }, [consoleLogs])
  

  async function getSound(recognizer, word, count) {
    for (let i = 0; i < count; i += 1) {
      setConsoleLogs([...consoleLogs, `Say ${word}`]);
      console.log('%c Say ', 'background: #ffcc99; color: black', word);
      await recognizer.collectExample(word);
    }
  }

  async function go() {
    // const word = document.querySelector('#word');
    const wordToLearn = word;

    const baseRecognizer = window.speechCommands.create('BROWSER_FFT');

    setConsoleLogs([...consoleLogs, 'Model Loading...']);
    console.log('Model Loading...');
    await baseRecognizer.ensureModelLoaded();

    setConsoleLogs([...consoleLogs, 'Building transfer recognizer...']);
    console.log('Building transfer recognizer...');
    const transferRecognizer = baseRecognizer.createTransfer('colors');

    if (wordToLearn.length > 3) {
      await getSound(transferRecognizer, wordToLearn, nSamples);
    }

    await getSound(transferRecognizer, 'Beautiful Day', nSamples);
    await getSound(transferRecognizer, '_background_noise_', nSamples);

    setConsoleLogs([...consoleLogs, 'Finished']);
    console.log('%c Finished ', 'background: #ccff99; color: black');

    
    console.table(transferRecognizer.countExamples());

    
    setConsoleLogs([...consoleLogs, 'Training...']);
    console.log('%c Training... ', 'background: #ffcccc; color: black');
    await transferRecognizer.train({
      epochs: 250,
      callback: {
        onEpochEnd: async (epoch, logs) => {
          setConsoleLogs([...consoleLogs, `Epoch ${epoch}: loss=${logs.loss}, accuracy=${logs.acc}`]);
          console.log(`Epoch ${epoch}: loss=${logs.loss}, accuracy=${logs.acc}`);
        }
      }
    });

    setConsoleLogs([...consoleLogs, 'Listening...']);
    console.log('%c Listening... ', 'background: #66ffff; color: black');
    await transferRecognizer.listen(
      (result) => {
        setConsoleLogs([...consoleLogs, 'Result...']);
        console.log('%c ', 'background: #66ffff; color: black');
        const words = transferRecognizer.wordLabels();

        const scores = Array.from(result.scores).map((s, i) => ({
          score: s,
          word: words[i]
        }));

        scores.sort((s1, s2) => s2.score - s1.score);

        setConsoleLogs([...consoleLogs, `Score for word '${scores[0].word}' = ${scores[0].score}`]);
        console.log(`Score for word '${scores[0].word}' = ${scores[0].score}`);
      },
      { probabilityThreshold: 0.75 }
    );
    setTimeout(() => {
      transferRecognizer.stopListening();
    }, 20e3);
  }

  return (
    <div>
      <main>
        <h1 className="display-4 text-center">Speech Recognition With TensorFlow.js</h1>
        <hr />
        <div className="card">
          <div className="card-body">
            <h4>1. Input a word or phrase below</h4>
            <h4>2. Open the developer console</h4>
            <h4>
              Press <b>start</b> listening and follow the instructions in the console Output below{' '}
            </h4>
            <div className="input">
              <div className='row'>
                <div className='col-6'>
              <label>Type the word to Train Speech</label>
              <input className='form-control' type="text" name="word" placeholder="Enter a word or phrase" onChange={(e) => setWord(e.target.value)} value={word} />
                </div>
                <div className='col-6'>
              <label>Samples to take</label>
              <input type='number' onChange={e => setnumSec(parseInt(e.target.value))} className='form-control' />
                </div>
              </div>
              <button onClick={go} className='btn btn-danger mt-4'> <i class="fas fa-ear"></i> Start Listening</button>
            </div>
          </div>
        </div>
        <textarea className="form-control fw-bold h4" rows={10} value={consoleLogs.join('\n')} disabled></textarea>
        <div id='console'></div>
      </main>
    </div>
  );
};

export default AudioModelTrainer;
