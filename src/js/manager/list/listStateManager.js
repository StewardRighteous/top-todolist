// Singleton pattern that will create a list for overall app
import {List, Project} from "../../models/barrel.js";

let instance;
let list = new List();

class ListStateManager{
    constructor(){
        if(instance){
            throw new Error("You can only create one instance");
        }
        instance = this;
    }
    
    getInstance(){
        return this;
    }

    getList(){
        return list;
    }

}

const listState = Object.freeze(new ListStateManager());
export default listState;