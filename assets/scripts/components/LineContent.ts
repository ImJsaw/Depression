import Game from "../Game";
import * as Define from "../Define";

const { ccclass, property } = cc._decorator;

/**line content */
@ccclass
export default class LineContent extends cc.Component {

    @property({type:cc.Enum(Define.LineMsg),serializable:true})
    msgName : Define.LineMsg = Define.LineMsg.None;

    @property(Number)
    maxOffSet : number = 200;

    private curOffset : number = 0;
    
    getMsgName() : Define.LineMsg{
        return this.msgName;
    }

    movePost(y : number){
        let offset = y;
        this.curOffset += y;
        //handle border
        if(this.curOffset > this.maxOffSet){
            offset = offset - (this.curOffset-this.maxOffSet);
            this.curOffset = this.maxOffSet;
        }
        if(this.curOffset < 0){
            offset = offset - this.curOffset;
            this.curOffset = 0;
        }
        this.node.y += offset;
    }

    onLoad(){
        let self = this;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            event.stopPropagation();
            let delta = event.touch.getDelta();
            //make map move with touch
            self.movePost(delta.y);
        });
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
            event.stopPropagation();
        });
    }
    
}
