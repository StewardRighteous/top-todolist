class Observable{
    constructor(){
        this.observers = [];
    }

    subscribe(func){
        this.observers.push(func);
    }

    unsubscribe(func){
        this.observers = this.observers.filter((observer => observer !== func));
    }

    notify(){
        this.observers.forEach(observer => observer());
    }
}

export default new Observable();