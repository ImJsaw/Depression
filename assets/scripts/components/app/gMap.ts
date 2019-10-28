import App from "../App";
import * as Define from "../../Define";

const {ccclass, property} = cc._decorator;


@ccclass
export default class gMap extends App {

    @property(cc.Node)
    mapRoot : cc.Node = null;

    private mapMax : cc.Vec2 = new cc.Vec2(600,800);
    private mapMin : cc.Vec2 = new cc.Vec2(-600,-800);
    

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
        //cache this to GameInfo
        Define.GameInfo.Inst.curApp = this;

        this.regDragEvent();
        
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

    endApp(){
        cc.log("end gMap");
        let action = cc.sequence(
            cc.spawn(
                cc.scaleTo(0.1, 0).easing(cc.easeCubicActionOut()),
                cc.fadeTo(0.1,0).easing(cc.easeCubicActionIn()),
            ),
            cc.callFunc(()=>{
                this.node.children.forEach( (element)=>element.active  = false);
            })
        )
        this.node.runAction(action);

        Define.GameInfo.Inst.curApp = undefined;
        this.unRegDragEvent();
        
    }
}
