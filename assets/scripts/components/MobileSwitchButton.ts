import * as Define from "../Define";
import UIMgr from "../UIMgr";
const { ccclass, property } = cc._decorator;

/**提示視窗物件 */
@ccclass
export default class mobileSwitchButton extends cc.Component {
    
    onLoad() {
    }

    onClick(){
        switch(Define.GameInfo.Inst.curState){
            case Define.GameState.Mobile:
                UIMgr.Inst.mobileMgr.gotoReality();
                break;
            case Define.GameState.Reality:
                UIMgr.Inst.realityMgr.openMobile();
                break;
            default:
                cc.warn("wrong state");
        }
    }
}
