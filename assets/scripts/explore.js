// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
    
    // all the available voices:
    var voices;
    var has_voice = false;
    var current_voice;
    var current_system;
    
    // load the voices:
    window.speechSynthesis.onvoiceschanged = function() {
        voices = window.speechSynthesis.getVoices();
        for (const voice in voices) {
            var option = document.createElement('option');
            option.text = voices[voice].name + ' (' + voices[voice].lang + ')';
            option.tag = 'pi';
            document.getElementById('voice-select').add(option, 0);
        }
    };
    
    // change the voice:
    document.getElementById('voice-select').addEventListener('change', function() {
        for (const voice in voices) {
            const name = voices[voice].name + ' (' + voices[voice].lang + ')';
            if (document.getElementById('voice-select').value == name) {
                has_voice = true;
                current_voice = voices[voice];
                break;
            }
        }
    });
    
    // play sound:
    for (const element of document.querySelectorAll('button')) {
        if (element.textContent.includes('Press to Talk')) {
            element.addEventListener('click', function() {
                if (has_voice && document.getElementById('text-to-speak').value != '') {
                    window.speechSynthesis.cancel()
                    current_system = new SpeechSynthesisUtterance(document.getElementById('text-to-speak').value);
                    current_system.voice = current_voice;
                    window.speechSynthesis.speak(current_system);
                    current_system.onstart = function (event) {
                        document.querySelectorAll('img')[0].src = 'assets/images/smiling-open.png';
                        document.querySelectorAll('img')[0].alt = 'Smiling face open';
                    };
                    current_system.onend = function (event) {
                        document.querySelectorAll('img')[0].src = 'assets/images/smiling.png';
                        document.querySelectorAll('img')[0].alt = 'Smiling face';
                    };
                }
            });
        }
    }
}
