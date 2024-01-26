//Slider Properties and text generation based on slider range
const slider = document.querySelector('#myRange');
const outputLocation = document.querySelector('.gridSize')
const output = document.querySelector('.sliderText');

//Main handler of the grid square
let grid = document.querySelector('.right-side');

output.innerHTML = slider.value + "x" + slider.value;

function color() {
    if (imageTick == 1) {
        return 'rgb(255, 255, 255)';
    } else {
        return 'rgb(0,0,0)'
    }
};

slider.oninput = () => {
    output.innerHTML = slider.value + "x" + slider.value;
    generateGrid(slider.value, false, color())
    toggleAll()
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
function generateGrid(g, prevElements=false, color='') {

    const width = (grid.style.width.slice(0,-2)) / g;
    const height = (grid.style.height.slice(0,-2)) / g;

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

        if (div.style.backgroundColor == 'rgb(255, 255, 255)' || div.style.backgroundColor == 'rgb(0, 0, 0)') {
            div.style.backgroundColor = color();
        }

        div.style.width = w + 'px';
        div.style.height = h + 'px';

        grid.appendChild(div);
    });
}

//Setup acutal grid colors

function gridColors(grid) {

    const gridSquares = grid.querySelectorAll('.gridProperties');
    let mousePress1 = false;
    let mousePress2 = false;

    gridSquares.forEach((div) => {

        div.style.userSelect = 'none';


        div.addEventListener('mousemove', (temp) => {
            if(temp.buttons == 1) {
             temp.preventDefault();
           
             // Your code here!
             div.style.backgroundColor = mouseOver(div.style.backgroundColor)
            }
           });

        div.addEventListener('click', () => {
            div.style.backgroundColor = clickOver(div.style.backgroundColor)
        });
    });
}

function mouseOver(div) {
    if(eraseToggle) {
        return color();
    } else if (rainbowToggle) {
        return "#" + Math.floor(Math.random()*16777215).toString(16);
    } else if (lightenToggle) {
        return lightenColor(div);
    } else if (darkenToggle) {
        return darkenColor(div);
    } else {
        return document.querySelector('#colorpicker1').value;
    }
}

function clickOver(div) {
    if(eraseToggle) {
        return color();
    } else if (rainbowToggle) {
        return "#" + Math.floor(Math.random()*16777215).toString(16);
    } else if (lightenToggle) {
        return lightenColor(div);
    } else if (darkenToggle) {
        return darkenColor(div);
    } else {
        return document.querySelector('#colorpicker1').value;
    }
}

//Clear Button
const clear = document.querySelector('#clear');

clear.addEventListener('click', () => {
    toggleAll();
    generateGrid(slider.value, false, color())
})

//Fill Button
const fill = document.querySelector('#fill');

fill.addEventListener('click', () => {
    const backgroundColor = document.querySelector('#colorpicker2').value;
    generateGrid(slider.value, false, backgroundColor);
});

//Toggle Variables
let eraseToggle = false;
let rainbowToggle = false;
let lightenToggle = false;
let darkenToggle = false;

//Toggle All
function toggleAll(ignore) {

    if(ignore != 'e') {
        toggleErase();
    }

    if(ignore != 'l') {
        toggleLighten();
    }


    if(ignore != 'r') {
        toggleRainbow();
    }

    if(ignore != 'd') {
        toggleDarken();
    }
}

//Eraser Button
const erase = document.querySelector('#erase');
const eraseStyle = document.querySelector('#erase-checkbox');

erase.addEventListener('change', () => {
    if(erase.checked) {
        toggleAll('e')
        eraseToggle = true;
    } else {
        eraseToggle = false;
    }
    eraseStyle.classList.toggle('toggle');
});

function toggleErase() {
    if(erase.checked) {
        erase.checked = false;
        eraseToggle = false;
        eraseStyle.classList.toggle('toggle');
        return
    }
}

//Rainbow Button
const rainbow = document.querySelector('#rainbow');
const rainbowStyle = document.querySelector('#rainbow-checkbox');

rainbow.addEventListener('change', () => {
    if(rainbow.checked) {
        toggleAll('r')
        rainbowToggle = true;
    } else {
        rainbowToggle = false;
    }
    rainbowStyle.classList.toggle('toggle');
});

function toggleRainbow() {
    if(rainbow.checked) {
        rainbow.checked = false;
        rainbowToggle = false;
        rainbowStyle.classList.toggle('toggle');
        return
    }
}

//Lighten Button
const lighten = document.querySelector('#lighten');
const lightenStyle = document.querySelector('#lighten-checkbox');

lighten.addEventListener('change', () => {
    if(lighten.checked) {
        toggleAll('l')
        lightenToggle = true;
    } else {
        lightenToggle = false;
    }
    lightenStyle.classList.toggle('toggle');
});

function lightenColor(divColor) {
    let divArray = divColor.match(/\d+/g).map(Number);
    divArray = divArray.map(value => Math.min(value + 20, 255));
    return `rgb(${divArray.join(',')})`
}

function toggleLighten() {
    if(lighten.checked) {
        lighten.checked = false;
        lightenToggle = false;
        lightenStyle.classList.toggle('toggle');
        return
    }
}

//Darken Button
const darken = document.querySelector('#darken');
const darkenStyle = document.querySelector('#darken-checkbox');

darken.addEventListener('change', () => {
    if(darken.checked) {
        toggleAll('d')
        darkenToggle = true;
    } else {
        darkenToggle = false;
    }
    darkenStyle.classList.toggle('toggle');
});

function darkenColor(divColor) {
    let divArray = divColor.match(/\d+/g).map(Number);
    divArray = divArray.map(value => Math.max(value - 20, 0));
    return `rgb(${divArray.join(',')})`
}

function toggleDarken() {
    if(darken.checked) {
        darken.checked = false;
        darkenToggle = false;
        darkenStyle.classList.toggle('toggle');
    }
}


//Dynamic width/height adjustment

function dynamicAdjust() {
    const grid = document.querySelector('.right-side');
    let dynamicWidth = (window.innerWidth * 0.4) + 8;

    grid.style.width = dynamicWidth + 'px';
    grid.style.height = dynamicWidth + 'px';
}

function dynamicAdjust2() {
    const colorPicker = document.querySelectorAll('.colorpicker');

    colorPicker.forEach((picker) => {
        picker.style.width = (window.innerWidth / 24) + 'px';
        picker.style.height = (window.innerWidth / 24) + 'px';
    })

    const header = document.querySelector('h1');
    header.style.fontSize = Math.max(30 ,(window.innerWidth / 32)) + 'px'
}


window.addEventListener('resize', () => {
    dynamicAdjust()
    dynamicAdjust2()
    generateGrid(slider.value, true)
});

window.onload = () => {
    dynamicAdjust()
    dynamicAdjust2()
    generateGrid(slider.value, false, color())
};



