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
    const width = grid.offsetWidth / g;
    const height = grid.offsetHeight / g;

    console.log(width);
    console.log(height);

    const area = width * height;

    const numberOfSquares = g*g;

    for(let i = 0; i < numberOfSquares; i++) {
        const tempDiv = document.createElement('div');
        tempDiv.classList.add('gridProperties');
        tempDiv.style.width = width + 'px';
        tempDiv.style.height = height + 'px';

        grid.appendChild(tempDiv);
    }

    console.log('this ran');

    return;
}

generateGrid(slider.value)