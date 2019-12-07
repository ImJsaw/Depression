import Game from "../Game";
import * as Define from "../Define";
import instagram from "./app/instagram";

const { ccclass, property } = cc._decorator;

/**ig profile */
@ccclass
export default class IGProfileEntry extends cc.Component {

    @property({type:cc.Enum(Define.IGAccount),serializable:true})
    account : Define.IGAccount = Define.IGAccount.None;

    @property(instagram)
    igInst : instagram = null;
    
    private delta : cc.Vec2 = new cc.Vec2(0,0);
    private startPos : cc.Vec2 = new cc.Vec2(0,0);
    private endPos : cc.Vec2 = new cc.Vec2(0,0);
    //觸發拖曳閾值
    private threshold : number = 50;

    onClick(){
        this.igInst.openProfile(this.account);
    }

    regDragEvent(){
        let self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            // cc.log("start");
            //reset delta
            self.delta = new cc.Vec2(0,0);
            //log start point
            self.startPos = event.getLocation();
        });
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var delta = event.touch.getDelta();
            self.delta.x += delta.x;
            self.delta.y += delta.y;
        });
        //release mouse inside
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            // cc.log("[Mobile]delta : " + self.delta.x + " , " + self.delta.y);
            //log start point
            self.endPos = event.getLocation();
            if( Math.abs(self.delta.y) < self.threshold ){
                self.onClick();
            }
        });
    }

    onLoad(){
        this.regDragEvent();
    }
}
