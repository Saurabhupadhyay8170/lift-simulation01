class stateStore{
    static numberOfFloors = 0
    static numberOfLifts = 0
    // tracks floors lifts are going to
    static #scheduledFloors = new Set()
    // keeps the list of all the floors
    static #floors = []
    // keeps the list of all the lifts
    static #lifts = []


    // adds lift to list
    static addLift(lift) {
        this.#lifts.push(lift)
    }
    // gets the array of list
    static getLiftList() {
        return [...this.#lifts]
    }
    // clears the list of lifts
    static clearLift() {
        this.#lifts = []
    }
    // sets the list of lifts
    static setLift(liftSet) {
        this.#lifts = liftSet
    }
    // remove floor from scheduled floors once lift reach
    static removeFromScheduledFloors(value) {
        this.#scheduledFloors.delete(value)
    }
    // added new stops to a lift
    static updateLiftStops(index, distance, floor) {
        // to check if a lift is already going to a particular floor
        if(this.#scheduledFloors.has(floor))
            return
        this.#lifts[index].direction = 'running'
        this.#lifts[index].stops.push({floor: floor, distance: distance})
        // managing the stops in a priority queue by sorting according to
        // relative distance of lift from floors
        this.#lifts[index].stops.sort((a,b) => a.distance - b.distance)
        this.#scheduledFloors.add(floor)
    }
    // opens and closes the door state
    static toggleDoor(index) {
        this.#lifts[index].door = !this.#lifts[index].door
    }


    // adds new floors to floor list
    static addFloor(floor) {
        this.#floors.push(floor)
    }
    // gets the list of floors
    static getFloorList() {
        return [...this.#floors]
    }
    // clears the list of floors
    static clearFloor() {
        this.#floors = []
    }    
}

export { stateStore }