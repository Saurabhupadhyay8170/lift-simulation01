import { generateButtonElement } from "./elements/Button.js"

// generates floor component
function generateFloorElement(floor, up, down, index) {
    const div = document.createElement("div")
    const buttonDiv = generateButtonElement(floor, up, down)
    const para = document.createElement("p")
    const liftContainer = document.createElement('div')
    para.innerText = `Floor ${floor.floorNumber+1}`
    div.id = floor.htmlID
    liftContainer.classList.add('lift-container')
    liftContainer.id = `lift-container${index}`
    div.classList.add('floor')
    div.appendChild(para)
    div.appendChild(buttonDiv)
    div.appendChild(liftContainer)
    return div
}

export { generateFloorElement }
