import { stateStore } from './dataStore.mjs'
import { Lift, Floor } from './models.mjs'


// initializes the floors and lifts for data models
function handleCreate(lifts, floors){
    stateStore.clearLift()
    stateStore.clearFloor()
    const children = [...document.getElementById('floors').childNodes]
    children.forEach((item)=>{
        item.remove()
    })
    stateStore.numberOfFloors = floors
    stateStore.numberOfLifts = lifts
    for(let i=0;i<lifts;i++){
        var lift = new Lift(i)
        stateStore.addLift(lift)
    }
    for(let i=0;i<floors;i++){
        var floor = new Floor(i)
        stateStore.addFloor(floor)
    }
}

// This function handles re-rendering and creates lift motion by translateY
function handleRerender() {
    const updatedStore = stateStore.getLiftList().map((lift, index) => {
        // check if door of a lift has to opened
        if(lift.door){
            // close door
            document.getElementById(lift.htmlID).style.transition = 'width 1000ms'
            document.getElementById(lift.htmlID).style.width = '60px'
            stateStore.toggleDoor(index)
        }
        // check if a lift is running
        else if(lift.direction !== 'none'){
            // check if lift has reached the destination
            if(lift.stops[0].floor === lift.currentPosition){
                // open door
                document.getElementById(lift.htmlID).style.transition = 'width 1000ms'
                document.getElementById(lift.htmlID).style.width = '0px'
                stateStore.toggleDoor(index)
                stateStore.removeFromScheduledFloors(lift.currentPosition)
                lift.stops.shift()
                if(lift.stops.length === 0)
                    lift.direction = 'none'
            }
            // if not reached then move towards destination
            else{
                if(lift.stops[0].floor-lift.currentPosition>0)
                {
                    // move up
                    lift.currentPosition = (lift.currentPosition+1)%stateStore.numberOfFloors
                    document.getElementById(lift.htmlID).style.transform = `translateY(${(-135.5)*lift.currentPosition}px)`
                    document.getElementById(lift.htmlID).style.transition = 'transform 1000ms'
                    document.getElementById(lift.htmlID).style.transitionTimingFunction = 'linear'
                    lift.stops[0].distance = lift.stops[0].distance - 1
                }
                else{
                    // move down
                    lift.currentPosition = (lift.currentPosition-1)>=0?lift.currentPosition-1:lift.currentPosition-1
                    document.getElementById(lift.htmlID).style.transform = `translateY(${-135.5*(lift.currentPosition)}px)`
                    document.getElementById(lift.htmlID).style.transition = 'transform 1000ms'
                    document.getElementById(lift.htmlID).style.transitionTimingFunction = 'linear'
                    lift.stops[0].distance = lift.stops[0].distance - 1
                }
            }
        }
        return lift
    })

    // update lifts state
    stateStore.setLift(updatedStore)
}

export { handleCreate, handleRerender }
