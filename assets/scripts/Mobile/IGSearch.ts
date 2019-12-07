import Game from "../Game";
import * as Define from "../Define";
import instagram from "./app/instagram";

const { ccclass, property } = cc._decorator;

/**ig profile */
@ccclass
export default class IGSearch extends cc.Component {

    @property(cc.Node)
    searchRoot : cc.Node = null;
    
    onClick(){
        //TODO

    }

    regDragEvent(){
        //register touch event
        let self = this;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            let delta = event.touch.getDelta();
            //make content move with touch
            self.moveContent( delta.y);
        });
    }

    moveContent(y : number){

    }
}
