import Game from "../Game";
import * as Define from "../Define";
import UIMgr from "../UIMgr";
import line from "../Mobile/app/line";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LineEntry extends cc.Component {

    @property({type:cc.Enum(Define.LineMsg),serializable:true})
    lineMsgName : Define.LineMsg = Define.LineMsg.None;

    @property(line)
    lineInst : line = null;
    
    onClick(){
        this.lineInst.openMsg(this.lineMsgName);
    }

    onLoad(){
        let self = this;
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
            self.onClick();
        });
    }
}
