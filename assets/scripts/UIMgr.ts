import AnimMgr from "./AnimationMgr";
import * as Define from "./Define";
import Game from "./Game";


const { ccclass, property } = cc._decorator;

@ccclass
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

    onLoad() {
        UIMgr.instance = this;

    }
}
