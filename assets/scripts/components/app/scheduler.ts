import * as Define from "../../Define";
import App from "../App";

const {ccclass, property} = cc._decorator;


@ccclass
export default class scheduler extends App {

    /**animation duration */
    private duration : number = 1;

    private offSet : number = 0;
    private maxOffSet : number = 100;

    onLoad(){
        this.node.scale = 0;
        this.node.opacity = 0;
        this.node.children.forEach( (element)=>{
            element.active  = false;
        } )
    }

    startApp(){
        //start anime
        cc.log("start IG");
        this.node.children.forEach( (element)=>element.active = true);
        let action = cc.spawn(
            cc.scaleTo(0.3, 1).easing(cc.easeCubicActionOut()),
            cc.fadeTo(0.3,255).easing(cc.easeCubicActionIn()),
        );
        this.node.runAction(action);

        
    }

    endApp(){
        cc.log("end Scheduler");
        
    }
}
