
// This is the Lift class, for creating data level abstration
class Lift {
    constructor(id, stops = [], currentPosition = 0, direction = 'none'){
        this.id = id
        this.htmlID = `lift${id}`
        this.stops = stops
        this.currentPosition = currentPosition
        this.door = false
        this.direction = direction
    }

    static addStop(stop) {
        this.stops.push(stop)
    }
    
    static reachedStop() {
        this.stops.shift()
    }
}

// This is floor class for creating data level abstration
class Floor{
    constructor(floorNumber){
        this.floorNumber = floorNumber
        this.htmlID = `floor${floorNumber}`
    }
}

export { Lift, Floor };