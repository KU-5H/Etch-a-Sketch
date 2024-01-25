//Slider Properties and text generation based on slider range
const slider = document.querySelector('#myRange');
const outputLocation = document.querySelector('.gridSize')
const output = document.querySelector('.sliderText');

output.innerHTML = slider.value + "x" + slider.value;

function color() {
    if (imageTick == 1) {
        return '#ffffff';
    } else {
        return '#000000'
    }
};

slider.oninput = () => {
    output.innerHTML = slider.value + "x" + slider.value;
    generateGrid(slider.value, false, color())
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
            const body = document.querySelector('body');
            body.style.backgroundColor = 'rgb(242,242,242)'
        
            const header = document.querySelector('h1');
            header.style.color = '#333'

            document.querySelectorAll('.colorText').forEach((div) => {div.style.color = '#333'})
            
            const gridText = document.querySelector('.gridText');
            gridText.style.color = '#333';

            const sliderText = document.querySelector('.sliderText');
            sliderText.style.color = '#333';

            generateGrid(slider.value, true)
        }

        lightMode()
        localStorage.setItem('darkMode', 'false');


    } else {
        image.src = 'images/5456551-200.png';
        imageTick = 0;

        const darkMode = () => {
            const body = document.querySelector('body');
            body.style.backgroundColor = '#333'
        
            const header = document.querySelector('h1');
            header.style.color = 'rgb(242,242,242)'

            document.querySelectorAll('.colorText').forEach((div) => {div.style.color = 'rgb(242,242,242)'})
            
            const gridText = document.querySelector('.gridText');
            gridText.style.color = 'rgb(242,242,242)';

            const sliderText = document.querySelector('.sliderText');
            sliderText.style.color = 'rgb(242,242,242)';
            
            generateGrid(slider.value, true)
        }

        darkMode()
        localStorage.setItem('darkMode', 'true');
    }
});

const darkMode = localStorage.getItem('darkMode');
if (darkMode == 'true') {
    imageButton.click();
}

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

        if(div.style.backgroundColor == '') {
            if (imageTick == 1) {
                div.style.backgroundColor = 'rgb(255, 255, 255)'
            } else {
                div.style.backgroundColor = 'rgb(0, 0, 0)'
            }
        } else if (imageTick == 1 && div.style.backgroundColor == 'rgb(0, 0, 0)') {
            div.style.backgroundColor = 'rgb(255, 255, 255)'
        } else if (imageTick == 0 && div.style.backgroundColor == 'rgb(255, 255, 255)') {
            div.style.backgroundColor = 'rgb(0, 0, 0)'
        }

        div.style.width = w + 'px';
        div.style.height = h + 'px';

        grid.appendChild(div);
    });
}

//Setup acutal grid colors
function gridColors(grid, erase = false, rainbow = false, lighten = false, darken = false) {
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
                    let brushColor = '#000000';
                    if(rainbow) {
                        brushColor = "#" + Math.floor(Math.random()*16777215).toString(16);
                    } else if (lighten) {
                        brushColor = lightenColor(div)
                    } else {
                        brushColor = document.querySelector('#colorpicker1').value;
                    }
                    div.style.backgroundColor = brushColor;
                }
            } else if (mousePress) {
                div.style.backgroundColor = '#ffffff';
            }
        });

        div.addEventListener('click', () => {
            if(!erase) {
                let brushColor = 0;
                if(rainbow) {
                    brushColor = "#" + Math.floor(Math.random()*16777215).toString(16);
                } else {
                    brushColor = document.querySelector('#colorpicker1').value;
                }
                div.style.backgroundColor = brushColor;
            } else {
                div.style.backgroundColor = '#ffffff';
            }
        });
    });
}

//Clear Button
const clear = document.querySelector('#clear');

clear.addEventListener('click', () => {
    toggleAll();
    generateGrid(slider.value)
})

//Fill Button
const fill = document.querySelector('#fill');

fill.addEventListener('click', () => {
    const backgroundColor = document.querySelector('#colorpicker2').value;
    generateGrid(slider.value, false, backgroundColor);
});

//Eraser Button
const erase = document.querySelector('#erase');
const eraseStyle = document.querySelector('#erase-checkbox');

erase.addEventListener('change', () => {
    if(erase.checked) {
        toggleRainbow();
        gridColors(grid, true, false, false, false)
    } else {
        gridColors(grid, false, false, false, false)
    }
    eraseStyle.classList.toggle('toggle');
});

function toggleErase() {
    if(erase.checked) {
        erase.checked = false;
        eraseStyle.classList.toggle('toggle');
    }
}

//Rainbow Button
const rainbow = document.querySelector('#rainbow');
const rainbowStyle = document.querySelector('#rainbow-checkbox');

rainbow.addEventListener('change', () => {
    if(rainbow.checked) {
        toggleErase();
        gridColors(grid, false, true, false, false);
    } else {
        gridColors(grid, false, false, false, false);
    }
    rainbowStyle.classList.toggle('toggle');
});

function toggleRainbow() {
    if(rainbow.checked) {
        rainbow.checked = false;
        rainbowStyle.classList.toggle('toggle');
    }
}

//Lighten Button
const lighten = document.querySelector('#lighten');
const lightenStyle = document.querySelector('#lighten-checkbox');

lighten.addEventListener('change', () => {
    if(lighten.checked) {
        console.log('lighten');
        gridColors(grid,false,false,true,false)
    } else {
        console.log('lieghtne off');
        gridColors(grid,false,false,false,false)
    }
    lightenStyle.classList.toggle('toggle');
});

function lightenColor(divColor) {
    console.log(divColor)

}

//Toggle all the toggles
function toggleAll() {
    toggleErase();
    toggleRainbow();
}



//Dynamic width/height adjustment

function dynamicAdjust() {
    const grid = document.querySelector('.right-side');
    let dynamicWidth = (window.innerWidth * 0.4) -8;

    grid.style.width = dynamicWidth + 'px';
    grid.style.height = dynamicWidth + 'px';
}

window.addEventListener('resize', () => {
    dynamicAdjust()
    generateGrid(slider.value, true)
});

window.onload = () => {
    dynamicAdjust()
    generateGrid(slider.value, false, color())
};



