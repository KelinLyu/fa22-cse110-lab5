// expose.js

const jsConfetti = new JSConfetti()

window.addEventListener('DOMContentLoaded', init);

function init() {
    
    // the sound to play:
    var audio_source = '';
    
    // select:
    for (const element of document.querySelectorAll('#horn-select')) {
        element.addEventListener('change', function() {
            if (element.value == 'air-horn') {
                audio_source = 'assets/audio/air-horn.mp3';
                document.querySelectorAll('img')[0].src = 'assets/images/air-horn.svg';
                document.querySelectorAll('img')[0].alt = 'Air-Horn';
            } else if (element.value == 'car-horn') {
                audio_source = 'assets/audio/car-horn.mp3';
                document.querySelectorAll('img')[0].src = 'assets/images/car-horn.svg';
                document.querySelectorAll('img')[0].alt = 'Car-Horn';
            } else if (element.value == 'party-horn') {
                audio_source = 'assets/audio/party-horn.mp3';
                document.querySelectorAll('img')[0].src = 'assets/images/party-horn.svg';
                document.querySelectorAll('img')[0].alt = 'Party-Horn';
            }
        });
    }
    
    // set volume:
    document.querySelectorAll('audio')[0].volume = document.querySelector('#volume-controls').querySelector('#volume').value * 0.01;
    document.querySelector('#volume-controls').querySelector('#volume').addEventListener('input', function() {
        if (document.querySelector('#volume-controls').querySelector('#volume').value == 0) {
            document.querySelector('#volume-controls').querySelectorAll('img')[0].src = 'assets/icons/volume-level-0.svg';
            document.querySelector('#volume-controls').querySelectorAll('img')[0].alt = 'Volume level 0';
        } else if (document.querySelector('#volume-controls').querySelector('#volume').value < 33) {
            document.querySelector('#volume-controls').querySelectorAll('img')[0].src = 'assets/icons/volume-level-1.svg';
            document.querySelector('#volume-controls').querySelectorAll('img')[0].alt = 'Volume level 1';
        } else if (document.querySelector('#volume-controls').querySelector('#volume').value < 67) {
            document.querySelector('#volume-controls').querySelectorAll('img')[0].src = 'assets/icons/volume-level-2.svg';
            document.querySelector('#volume-controls').querySelectorAll('img')[0].alt = 'Volume level 2';
        } else {
            document.querySelector('#volume-controls').querySelectorAll('img')[0].src = 'assets/icons/volume-level-3.svg';
            document.querySelector('#volume-controls').querySelectorAll('img')[0].alt = 'Volume level 3';
        }
        document.querySelectorAll('audio')[0].volume = document.querySelector('#volume-controls').querySelector('#volume').value * 0.01;
    }, false);
    
    // play sound:
    for (const element of document.querySelectorAll('button')) {
        if (element.textContent.includes('Play Sound')) {
            element.addEventListener('click', function() {
                if (audio_source != '') {
                    document.querySelectorAll('audio')[0].src = audio_source;
                    document.querySelectorAll('audio')[0].play();
                    if (audio_source == 'assets/audio/party-horn.mp3') {
                        jsConfetti.addConfetti();
                    }
                }
            });
        }
    }
}
