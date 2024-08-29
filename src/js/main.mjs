import { handleCreate, handleRerender } from "./controllers.mjs"
import { createFloor, createLift } from "./utils.mjs";


// This adds functionality to the create button
document.getElementById("create").addEventListener("click", () => {
    var lift = document.getElementById("lift-input").value
    var floor = document.getElementById("floor-input").value
    handleCreate(lift, floor)
    createFloor()
    createLift()
});

// This is the main runner function which runs handleRerender
// in every 1s
setInterval(async () => {handleRerender()}, 1000)
