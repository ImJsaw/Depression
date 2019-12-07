import Game from "../Game";
import * as Define from "../Define";

const { ccclass, property } = cc._decorator;

/**ig profile */
@ccclass
export default class IGProfile extends cc.Component {

    @property({type:cc.Enum(Define.IGAccount),serializable:true})
    account : Define.IGAccount = Define.IGAccount.None;
    
    getAccount() : Define.IGAccount{
        return this.account;
    }
}
