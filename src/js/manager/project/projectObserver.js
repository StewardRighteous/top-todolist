// Observer pattern to reload parts of UI when any project state changes
class ProjectObservable{
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

export default new ProjectObservable();