//Slider Properties and text generation based on slider range
const slider = document.querySelector('#myRange');
const outputLocation = document.querySelector('.gridSize')
const output = document.createElement('div');

output.innerHTML = slider.value + "x" + slider.value;
outputLocation.appendChild(output)

slider.oninput = () => {
    output.innerHTML = slider.value + "x" + slider.value;
    document.querySelector('.right-side').innerHTML = ''
    generateGrid(slider.value);
};

//For the dark mode button
let imageTick = 1;
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

//To generate a bunch of grids inside the main grid
function generateGrid(g) {

    const grid = document.querySelector('.right-side');
    const width = (grid.style.width.slice(0,-2) ) / g;
    const height = (grid.style.height.slice(0,-2) ) / g;


    const numberOfSquares = g*g;

    for(let i = 0; i < numberOfSquares; i++) {
        const tempDiv = document.createElement('div');
        tempDiv.classList.add('gridProperties');
        tempDiv.style.width = width + 'px';
        tempDiv.style.height = height + 'px';

        grid.appendChild(tempDiv);
    }

    return;
}


//Dynamic width/height adjustment

function dynamicAdjust() {
    const grid = document.querySelector('.right-side');
    let dynamicWidth = window.innerWidth * 0.4;

    grid.style.width = dynamicWidth + 'px';
    grid.style.height = dynamicWidth + 'px';

    console.log(dynamicWidth)
    console.log(window.innerHeight)
    grid.innerHTML = '';
    generateGrid(slider.value)
}

window.addEventListener('resize', () => {dynamicAdjust()});
window.onload = () => {dynamicAdjust()};

