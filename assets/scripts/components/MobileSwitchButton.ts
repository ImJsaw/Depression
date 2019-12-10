import * as Define from "../Define";
import UIMgr from "../UIMgr";
const { ccclass, property } = cc._decorator;

/**提示視窗物件 */
@ccclass
export default class mobileSwitchButton extends cc.Component {
    
    @property(cc.Node)
    realityIcon : cc.Node = null;

    @property(cc.Node)
    mobileIcon : cc.Node = null;
    
    onLoad() {
        this.realityIcon.active = true;
        this.mobileIcon.active = false;
    }

    update(){
        switch(Define.GameInfo.Inst.curState){
            case Define.GameState.Mobile:
                this.realityIcon.active = true;
                this.mobileIcon.active = false;
            break;
            case Define.GameState.Reality:
                this.realityIcon.active = false;
                this.mobileIcon.active = true;
            break;
            default:
                this.realityIcon.active = false;
                this.mobileIcon.active = false;
        }
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
