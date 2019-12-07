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
    
    onClick(){
        this.igInst.openProfile(this.account);
    }
}
