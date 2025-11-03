import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './components/loveLetter.css';
import song from "./birth.mp3";
import { TypeAnimation } from 'react-type-animation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img2 from "./tas.jpg"

function App() {
  const audioRef = useRef(null);
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const displayName = name.trim() || 'Tasnim';

  useEffect(() => {
    if (audioRef.current) {
      if (step >= 3 && step <= 8) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [step]);

  const sendResponse = async (type) => {
    try {
      await axios.post('https://confbackend.onrender.com/send-response', {
        type,
        name: displayName,
        message: type === 'message' ? message : undefined,
      });
    } catch {
      toast.error('Oops, failed to send. Please try again later.');
    }
  };

  const BackButton = () => (
    <button 
      className="btn-secondary mt-2 bba"
      onClick={() => setStep(step - 1)}
      disabled={step === 0}
    >
      ← Back
    </button>
  );

  return (
    <div className="container">
      <ToastContainer position="top-center" autoClose={3000} />

      <audio ref={audioRef} loop>
        <source src={song} type="audio/mpeg" />
      </audio>

      {step === 0 && (
        <div className="intro fade-in">
          <h1 className="intro-title">🎉 Hello Tasnim</h1>
          <img src={img2} alt={displayName} className="profile-img" />
          <p className="intro-text">A special little surprise for you, {displayName}...</p>
          <button onClick={() => setStep(1)} className="btn-primary">Begin</button>
        </div>
      )}

      {step === 1 && (
        <div className="card fade-in">
          <h1>Welcome 💌</h1>
          <p>We are so excited to celebrate your special day!</p>
          <p>Get ready for some surprises 😊</p>
          <button onClick={() => setStep(2)} className="btn-primary">Continue</button>
          <BackButton />
        </div>
      )}

      {step === 2 && (
        <div className="card fade-in">
          <h1>Hey {displayName} 🌸</h1>
          <TypeAnimation
            sequence={[
              `Happy Birthday ${displayName}! 🎉`,
              1000,
              'Wishing you a day full of joy, laughter, and love!',
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '1.3em', display: 'inline-block', color: '#e91e63', fontWeight: '600' }}
            repeat={0}
          />
          <button onClick={() => setStep(3)} className="btn-primary">Next</button>
          <BackButton />
        </div>
      )}

      {step === 3 && (
        <div className="card fade-in">
          <div className="floating-hearts">💖 💕 💘 💝 💞</div>
          <h1>Celebration 🎊</h1>
          <p>May your birthday be as wonderful as you are! Enjoy every moment and make unforgettable memories today ✨</p>
          <button onClick={() => setStep(4)} className="btn-primary mt-2">Continue</button>
          <BackButton />
        </div>
      )}

      {step === 4 && (
        <div className="card fade-in confession-bg">
          <div className="floating-hearts">💖 💕 💘 💝 💞</div>
          <div className="confession-flex">
            <div className="confession-left">
              <div className="envlope-wrapper">
                <div
                  id="envelope"
                  className={isOpen ? 'open' : 'close'}
                  title="Click to open/close envelope"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div className="front flap"></div>
                  <div className="front pocket"></div>

                  <div className="letter">
                    <div className="words line1">To: {displayName}</div>
                    <div className="words line2">Hope this little note brightens your day and brings a big smile to your face! 🎁</div>
                  </div>

                  <div className="hearts">
                    <div className="heart a1"></div>
                    <div className="heart a2"></div>
                    <div className="heart a3"></div>
                  </div>
                </div>
              </div>

              <button onClick={() => setStep(5)} className="btn-primary mt-4">Next</button>
              <BackButton />
            </div>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="card fade-in">
          <div className="floating-hearts">💖 💕 💘 💝 💞</div>
          <h1>Do you like the surprise?</h1>
          <div className="choices">
            <button
              className="yes"
              onClick={() => {
                sendResponse('yes');
                setStep(6);
              }}
            >
              Absolutely! 💕
            </button>
            <button
              className="no"
              onClick={() => {
                sendResponse('no');
                setStep(7);
              }}
            >
              Not really 🙁
            </button>
          </div>
          <BackButton />
        </div>
      )}

     
    </div>
  );
}

export default App;
