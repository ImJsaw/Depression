import App from "./App";
import mapIcon from "../mapIcon";
import { GameInfo } from "../../Define";

const {ccclass, property} = cc._decorator;


@ccclass
export default class gMap extends App {

    @property(cc.Node)
    mapRoot : cc.Node = null;

    @property(cc.Node)
    cursor : cc.Node = null;

    @property(cc.Node)
    iconRoot : cc.Node = null;
    

    private mapMax : cc.Vec2 = new cc.Vec2(1000,500);
    private mapMin : cc.Vec2 = new cc.Vec2(-1000,-500);

    onLoad(){
        this.node.scale = 0;
        this.node.opacity = 0;
        this.node.children.forEach( (element)=>{
            element.active  = false;
        } )
        
    }

    startApp(){
        
        cc.log("start gMap");
        this.node.children.forEach( (element)=>element.active = true);
        let action = cc.spawn(
            cc.scaleTo(0.3, 1).easing(cc.easeCubicActionOut()),
            cc.fadeTo(0.3,255).easing(cc.easeCubicActionIn()),
        );
        this.node.runAction(action);

        this.regDragEvent();

        this.updateCursor();
        
    }

    regDragEvent(){
        //register touch event
        let self = this;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            let delta = event.touch.getDelta();
            //make map move with touch
            self.moveMap(delta.x, delta.y);
        });
    }

    unRegDragEvent(){
        this.node.off(cc.Node.EventType.TOUCH_MOVE);
    }
    /**
     * move map
     * @param x 
     * @param y 
     */
    moveMap( x : number, y : number){
        this.mapRoot.x += x;
        this.mapRoot.y += y;
        //handle border
        if(this.mapRoot.x > this.mapMax.x)
            this.mapRoot.x = this.mapMax.x;
        if(this.mapRoot.y > this.mapMax.y)
            this.mapRoot.y = this.mapMax.y;
        if(this.mapRoot.x < this.mapMin.x)
            this.mapRoot.x = this.mapMin.x;
        if(this.mapRoot.y < this.mapMin.y)
            this.mapRoot.y = this.mapMin.y;
        
    }

    updateCursor(){
        let self = this;
        this.iconRoot.children.forEach((element)=>{
            if(element.getComponent(mapIcon).scene == GameInfo.Inst.curRealityScene){
                self.cursor.position = element.position
            }
        })
    }

    endApp(){
        cc.log("end gMap");
        this.unRegDragEvent();
    }
}
