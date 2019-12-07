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
    
    getAccount() : Define.IGAccount{
        return this.account;
    }

    movePost(y : number){
        this.postRoot.y += y;
        //handle border
        if(this.postRoot.y > this.maxOffSet)
            this.postRoot.y = this.maxOffSet;
        if(this.postRoot.y < 0)
            this.postRoot.y = 0;
    }

    onLoad(){
        let self = this;
        this.postRoot.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            let delta = event.touch.getDelta();
            //make map move with touch
            self.movePost(delta.y);
        });
    }
    
}
