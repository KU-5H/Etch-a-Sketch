//To create text for the slider
const slider = document.querySelector('#myRange');
const outputLocation = document.querySelector('.gridSize')
const output = document.createElement('div');

output.innerHTML = slider.value + "x" + slider.value;
outputLocation.appendChild(output)

slider.oninput = () => {output.innerHTML = slider.value + "x" + slider.value};

//For the dark mode button
let imageTick = 0;
const image = document.querySelector('.mode');
const imageButton = document.querySelector('.modeButton')

imageButton.addEventListener('click', () => {
    if (imageTick === 0) {
        image.src = 'images/4808961-200.png'
        imageTick = 1;

        const lightMode = () => {

        }

        lightMode()


    } else {
        image.src = 'images/5456551-200.png';
        imageTick = 0;

        const darkMode = () => {

        }

        darkMode()
    }
});

