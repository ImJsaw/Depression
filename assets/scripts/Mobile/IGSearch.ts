import Game from "../Game";
import * as Define from "../Define";
import instagram from "./app/instagram";

const { ccclass, property } = cc._decorator;

/**ig profile */
@ccclass
export default class IGSearch extends cc.Component {

    @property(cc.Node)
    searchRoot : cc.Node = null;

    @property(Number)
    maxOffSet : number = 200;
    
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
        this.searchRoot.y += y
        //handle border
        if(this.searchRoot.y > this.maxOffSet)
            this.searchRoot.y = this.maxOffSet;
        else if(this.searchRoot.y < 0)
            this.searchRoot.y = 0;
    }
}
