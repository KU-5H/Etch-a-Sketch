//To create text for the slider
const slider = document.querySelector('#myRange');
const outputLocation = document.querySelector('.gridSize')
const output = document.createElement('div');

output.innerHTML = slider.value + "x" + slider.value;
outputLocation.appendChild(output)

slider.oninput = () => {output.innerHTML = slider.value + "x" + slider.value};