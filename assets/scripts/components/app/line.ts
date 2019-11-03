import App from "../App";
import * as Define from "../../Define";
import LineMsgPrefab from "../LineMsgPrefab";

const {ccclass, property} = cc._decorator;


@ccclass
export default class gMap extends App {

    @property(cc.Node)
    msgRoot : cc.Node = null;

    /**msg prefab */
    @property(cc.Prefab)
    msgPrefab : cc.Prefab = null;

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
        cc.log("start line");
        this.node.children.forEach( (element)=>element.active = true);
        let action = cc.spawn(
            cc.scaleTo(0.3, 1).easing(cc.easeCubicActionOut()),
            cc.fadeTo(0.3,255).easing(cc.easeCubicActionIn()),
        );
        this.node.runAction(action);


        //refresh msg
        this.msgRoot.children.forEach((element)=>element.destroy());

        //test
        this.generateMsg();

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
            self.moveMsg( delta.y);
        });
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            self.msgPosRecover();
        });
    }

    unRegDragEvent(){
        this.node.off(cc.Node.EventType.TOUCH_MOVE);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL);
    }


    generateMsg(){
        //generate new msg
        let node = cc.instantiate(this.msgPrefab);
        node.parent = this.msgRoot;
        node.y = 200;

        //manage serial num
        node.getComponent(LineMsgPrefab).init(1);

        //move all exist msg down
        this.msgRoot.children.forEach(element=>{
            element.getComponent(LineMsgPrefab).moveDown();
        })
    }

    /**
     * move msgs
     * @param y 
     */
    moveMsg( y : number){
        this.offSet += y
        //handle border
        if(this.offSet > this.maxOffSet)
            this.offSet = this.maxOffSet;
        else if(this.offSet < -this.maxOffSet)
            this.offSet = -this.maxOffSet;
        else{
            cc.log("offset : " + this.offSet);
            this.msgRoot.children.forEach( (element)=>element.y += y);
        }
    }

    msgPosRecover(){
        this.msgRoot.children.forEach( (element)=> element.y -= this.offSet);
        this.offSet = 0;
    }

    endApp(){
        cc.log("end line");
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
