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
    maxOffSet : number = 1000;

    @property(Number)
    minOffSet : number = 480;

    regDragEvent(){
        //register touch event
        cc.log("reg");
        let self = this;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            event.stopPropagation();
            cc.log("move");
            let delta = event.touch.getDelta();
            //make content move with touch
            self.moveContent( delta.y);
        });
    }

    onLoad(){
        this.regDragEvent();
    }

    moveContent(y : number){
        this.searchRoot.y += y
        //handle border
        if(this.searchRoot.y > this.maxOffSet)
            this.searchRoot.y = this.maxOffSet;
        else if(this.searchRoot.y < this.minOffSet)
            this.searchRoot.y = this.minOffSet;
    }
}
