import Game from "../Game";
import * as Define from "../Define";

const { ccclass, property } = cc._decorator;

/**ig profile */
@ccclass
export default class IGProfile extends cc.Component {

    @property({type:cc.Enum(Define.IGAccount),serializable:true})
    account : Define.IGAccount = Define.IGAccount.None;

    @property(cc.Node)
    postRoot : cc.Node = null;

    @property(Number)
    maxOffSet : number = 200;

    private curOffset : number = 0;
    
    getAccount() : Define.IGAccount{
        return this.account;
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
        this.postRoot.children.forEach((element)=>element.y += offset);
    }

    onLoad(){
        let self = this;
        this.postRoot.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            event.stopPropagation();
            let delta = event.touch.getDelta();
            //make map move with touch
            self.movePost(delta.y);
        });
    }
    
}
