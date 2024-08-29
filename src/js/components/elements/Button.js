

// generates up-down buttons
function generateButtonElement(floor, up, down) {
    const div = document.createElement("div")
    div.id = `b${floor.floorNumber}`
    div.classList.add('btn-container')
    if(up)
    {
        const upButton = document.createElement("button")
        upButton.innerText = `UP`
        upButton.classList.add('up-btn')
        div.appendChild(upButton)
    }
    if(down){
        const downButton = document.createElement("button")
        downButton.innerHTML = `DOWN`
        downButton.classList.add('down-btn')
        div.appendChild(downButton)
    }
    return div
}

export { generateButtonElement }
