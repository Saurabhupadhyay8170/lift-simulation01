
// generates lift component
function generateLiftElement(lift, index) {
    const div = document.createElement("div")
    div.style = `position: absolute; left: ${150*index}px`

    div.id = lift.htmlID
    div.classList.add("lift")
    return div
}

export { generateLiftElement }
