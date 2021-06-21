import './App.css';
import {useState} from "react";
import { Button } from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import {WebcamCapture} from './WebCam';

var onSuccess = function(stream) {
  console.log('Success!');
}

var onError = function(error) {
  console.log('Error :(');
}

function App() {

  const [openCamera, setOpenCamera] = useState(false)  
  const [text, setText] = useState({})
  const handleOpenCamera = e => {
    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ video: false, audio: true }, onSuccess, onError);
    } else {
        onError();
    }
    setOpenCamera(true)
  }
  return (
    <div className="App">
        {!openCamera && 
          <Button 
            variant="outline-success"
            onClick={handleOpenCamera}
          >
            open camera
          </Button>
        }
        {openCamera &&
          <Modal.Dialog>
            <Modal.Header 
              closeButton
              onClick={() => setOpenCamera(false)}
            >
            </Modal.Header>
            <Modal.Body>
              <WebcamCapture
              setText={setText}
              />
            </Modal.Body>
          </Modal.Dialog>
        }
        {text.text?.length > 0 && 
          <div>
          {text.text}
          </div>
        }
    </div>
  );
}

export default App;
