import AnimMgr from "./animMgr";
import * as Define from "./Define";
import Game from "./Game";
import MobileUIMgr from "./UI/MobileUIMgr";
import RealityUIMgr from "./UI/RealityUIMgr";
import PostWorldUIMgr from "./UI/PostWorldUIMgr";


const { ccclass, property, executionOrder} = cc._decorator;

@ccclass
@executionOrder(-1)
export default class UIMgr extends cc.Component {

    private static instance: UIMgr;

    /**
     * 取得遊戲主控端
     */
    static get Inst(): UIMgr {
        if (!UIMgr.instance) {
            return undefined;
        }
        return this.instance;
    }

    @property(AnimMgr) animMgr: AnimMgr = null;
    @property(MobileUIMgr) mobileMgr: MobileUIMgr = null;
    @property(RealityUIMgr) realityMgr: RealityUIMgr = null;
    @property(PostWorldUIMgr) postMgr: PostWorldUIMgr = null;

    onLoad() {
        UIMgr.instance = this;
    }

    showMobile( isOn : boolean){
        //anim if need
        //TODO in animNgr....
        this.mobileMgr.showMobileUI(isOn);
    }
    
    showReality( isOn : boolean){
        //anim if need
        //TODO in animNgr....
        this.realityMgr.showRealityUI(isOn);
    }
    
    showPost( isOn : boolean){
        //anim if need
        //TODO in animNgr....
        this.postMgr.showPostUI(isOn);
    }

    transitionAnim(todo?,onFinished?){
        this.animMgr.playTransitionAnim(todo,onFinished);
    }
}
