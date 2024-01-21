//Slider Properties and text generation based on slider range
const slider = document.querySelector('#myRange');
const outputLocation = document.querySelector('.gridSize')
const output = document.createElement('div');

output.innerHTML = slider.value + "x" + slider.value;
outputLocation.appendChild(output)

slider.oninput = () => {
    output.innerHTML = slider.value + "x" + slider.value;
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
const grid = document.querySelector('.right-side');

function generateGrid(g, prevElements=false, color='') {

    const width = (grid.style.width.slice(0,-2) ) / g;
    const height = (grid.style.height.slice(0,-2) ) / g;


    const numberOfSquares = g*g;

    if (prevElements) {
        const prevSquares = grid.querySelectorAll('.gridProperties');
        prevGenerateGrid(width,height,prevSquares);
        return;
    } else {
        grid.innerHTML = '';
    }

    for(let i = 0; i < numberOfSquares; i++) {
        const tempDiv = document.createElement('div');
        tempDiv.classList.add('gridProperties');
        tempDiv.style.width = width + 'px';
        tempDiv.style.height = height + 'px';

        if (color !== '') {
            tempDiv.style.backgroundColor = color;
        }

        grid.appendChild(tempDiv);
    }

    gridColors(grid)

    return;
}

function prevGenerateGrid(w,h,prevSquares) {

    grid.innerHTML = ''

    prevSquares.forEach((div) => {



        div.style.width = w + 'px';
        div.style.height = h + 'px';

        grid.appendChild(div);

    });
}

//Setup acutal grid colors
function gridColors(grid, erase = false) {
    const gridSquares = grid.querySelectorAll('.gridProperties');
    let mousePress = false;

    gridSquares.forEach((div) => {

        div.style.userSelect = 'none';

        div.addEventListener('mousedown', () => {
            mousePress = true;
        });

        div.addEventListener('mouseup', () => {
            mousePress = false;
        });

        div.addEventListener('mouseLeave', () => {
            mousePress = false;
        })

        div.addEventListener('mouseover', () => {

            if(!erase) {
                if(mousePress) {
                    const brushColor = document.querySelector('#colorpicker1').value;
                    div.style.backgroundColor = brushColor;
                }
            } else if (mousePress) {
                div.style.backgroundColor = '#ffffff';
            }
        });
    });
}

//Clear Button
const clear = document.querySelector('#clear');

clear.addEventListener('click', () => {
    generateGrid(slider.value)
})

//Eraser Button
const erase = document.querySelector('#erase');
const eraseStyle = document.querySelector('.erase-checkbox');

erase.addEventListener('change', () => {
    if(erase.checked) {
        gridColors(grid, true)
        eraseStyle.classList.toggle('erase-toggle');
    } else {
        gridColors(grid, false)
        eraseStyle.classList.toggle('erase-toggle');
    }
});

//Fill Button
const fill = document.querySelector('#fill');

fill.addEventListener('click', () => {
    const backgroundColor = document.querySelector('#colorpicker2').value;
    generateGrid(slider.value, false, backgroundColor);
});

//Dynamic width/height adjustment

function dynamicAdjust() {
    const grid = document.querySelector('.right-side');
    let dynamicWidth = window.innerWidth * 0.4;

    grid.style.width = dynamicWidth + 'px';
    grid.style.height = dynamicWidth + 'px';
}

window.addEventListener('resize', () => {
    dynamicAdjust()
    generateGrid(slider.value, true)
});
window.onload = () => {
    dynamicAdjust()
    generateGrid(slider.value)
};



