function display(val) {
    document.getElementById('result').value += val
    return val
}

function solve() {
    let x = document.getElementById('result').value
    let y = eval(x);
    document.getElementById('result').value = y
    
    // speak "Output is" followed by the result
    const outputText = "Output is " + y ;
    const speech = new SpeechSynthesisUtterance(outputText);
    speech.rate = 0.8;
    speech.volume = 1;
    speech.voice = speechSynthesis.getVoices()[0];
    speechSynthesis.speak(speech);

    return y
}

function clearScreen() {
    document.getElementById('result').value = ''

    const speech = new SpeechSynthesisUtterance("Screen is Clear Now");
    speech.rate = 0.8;
    speech.volume = 1;
    speech.voice = speechSynthesis.getVoices()[0];
    speechSynthesis.speak(speech);
}

// Add event listeners to the document object to listen for key presses
document.addEventListener("keydown", handleKeyPress);

// Function to handle key presses
function handleKeyPress(event) {

  // Get the key code of the pressed key
  var keyCode = event.keyCode || event.which;

  //Text to speech 
  const textToSpeech = event.key === "-" ? "minus" : event.key; // replace "-" with "minus" if it's the minus key
  var speech = new SpeechSynthesisUtterance(textToSpeech);
  
  // Set the speech rate and volume (optional)
  speech.rate = 0.8;
  speech.volume = 1;
  // Use the default system voice
  speech.voice = speechSynthesis.getVoices()[0];

  speechSynthesis.speak(speech);

  // Check if the key code is a number key (0-9)
  if (keyCode >= 48 && keyCode <= 57 && !event.shiftKey) {
    var number = keyCode - 48;
    display(number)
  }
  
  // Check if the key code is the decimal point key (.)
  else if (keyCode == 190) {
    display('.')
  }
  
  // Check if the key code is an operator key (+, -, *, /)
  else if ((keyCode == 187 || keyCode == 56) && event.shiftKey || (keyCode == 191) || (keyCode == 189)) {
    // If so, get the corresponding operator and call the setOperator function
    var operator;
    switch (keyCode) {
      case 187:
        operator = "+";
        break;
      case 189:
        operator = "-";
        break;
      case 56:
        operator = "*";
        break;
      case 191:
        operator = "/";
        break;
    }

    display(operator)
  }
  
  // Check if the key code is the equals key (= or Enter)
  else if ((keyCode == 187 ) || keyCode == 13) {
    solve();

  }
  
  // Check if the key code is the clear key (C)
  else if (keyCode == 67) {
    clearScreen();
  }
}
