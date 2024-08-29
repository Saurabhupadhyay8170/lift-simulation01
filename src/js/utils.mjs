import { stateStore } from "./dataStore.mjs";
import { generateFloorElement } from "./components/Floor.js";
import { generateLiftElement } from "./components/Lift.js"


// This calculates the relative distance of a lift from a give floor
// Takes the follow parameters 
// currentFloor -> current floor lift is on
// calledFloor -> the floor we have to calculate relative distance to
// finalStop -> if lift is moving what is it's current final stop
// calledDirection -> what button has been pressed up or down
function calculateDistance(currentFloor, calledFloor, finalStop, calledDirection) {
    if(finalStop === undefined){
        return Math.abs(calledFloor-currentFloor)
    }
    if(finalStop - currentFloor > 0){
        if(currentFloor>calledFloor)
            return (finalStop - currentFloor) + (finalStop - calledFloor)
        else if(calledDirection === 'down' && calledFloor > currentFloor && calledFloor < finalStop)
            return (finalStop - currentFloor) + (finalStop - calledFloor)
        return calledFloor - currentFloor
    }
    if(currentFloor<calledFloor)
        return (currentFloor - finalStop) + (calledFloor - currentFloor)
    else if(calledDirection === 'up' && calledFloor < currentFloor && calledFloor > finalStop)
        return (currentFloor - finalStop) + (currentFloor - finalStop)
    return currentFloor - calledFloor
}

// This function handles task assignment that is which lift 
// will go to which floor
function assignTask(floor, calledDirection) {
    let closestDistnce = Number.MAX_SAFE_INTEGER
    let assignTo
    stateStore.getLiftList().map((lift, index)=>{
        let distance = calculateDistance(lift.currentPosition, floor.floorNumber, lift.stops.length === 0?undefined:lift.stops[lift.stops.length-1].floor, calledDirection)
        if(distance<closestDistnce){
            closestDistnce = distance
            assignTo = {lift: lift, distance: distance, index: index}
        }
    })
    stateStore.updateLiftStops(assignTo.index, assignTo.distance, floor.floorNumber)
}

// This function creates the floors at UI level
function createFloor() {
    const floorList = stateStore.getFloorList()
    floorList.map((floor,index) => {
        let div
        if(index === 0){
            div = generateFloorElement(floor, true, false, index)
            div.childNodes[1].childNodes[0].onclick = () => {assignTask(floor, 'up')}
        }
        else if(index === stateStore.numberOfFloors-1){
            div = generateFloorElement(floor, false, true, index)
            div.childNodes[1].childNodes[0].onclick = () => {assignTask(floor, 'down')}
        }
        else{
            div = generateFloorElement(floor, true, true, index)
            div.childNodes[1].childNodes[0].onclick = () => {assignTask(floor, 'up')}
            div.childNodes[1].childNodes[1].onclick = () => {assignTask(floor, 'down')}
        }
        document.getElementById("floors").appendChild(div)
    })
}

// This function creates the lifts at UI level
function createLift() {
    const liftList = stateStore.getLiftList()
    liftList.map((lift,index) => {
        const div = generateLiftElement(lift, index)
        document.getElementById(`lift-container${lift.currentPosition}`).appendChild(div);
    })
}

export { assignTask, createFloor, createLift }
