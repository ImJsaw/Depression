import * as Define from "../../Define";
import GameMgr from "../../GameMgr";
import Game from "../../Game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AppLock extends cc.Component {

    private count: number;

    private curNum: number = 0;

    /**已填密碼顏色 */
    @property(cc.Color)
    color: cc.Color = cc.Color.BLACK;

    @property(cc.Node)
    pwRoot: cc.Node = null;

    start() {
        this.count = 0
        this.curNum = 0;
    }
    press(customData, n) {
        let num: number = parseInt(n);
        if (this.count < 4) this.count++;

        for (let i = 0; i < this.count; i++) {
            this.pwRoot.children[i].color = this.color;
        }
        //update curPassword
        this.curNum = this.curNum * 10 + num;
        cc.log("curPW : " + this.curNum);

        if (this.count == 4) {
            if (this.isPasswordCorrect()) {
                    Game.Inst.eventMgr.screenUnlock();
                    this.node.active = false
            }
            this.reset();
        }
    }

    isPasswordCorrect() {
        if (this.curNum == Define.GameInfo.Inst.mobilePassword)
            return true;
        cc.log("cur : " + this.curNum + ", correct : " + Define.GameInfo.Inst.mobilePassword);
        return false;
    }

    reset() {
        this.count = 0;
        this.curNum = 0;
        this.pwRoot.children.forEach(node => node.color = cc.Color.WHITE);
    }

    del() {
        if (this.count > 0) {
            this.count--;
            this.curNum = Math.floor(this.curNum / 10);
            cc.log("curPW : " + this.curNum);
            this.pwRoot.children[this.count].color = cc.Color.WHITE;
        }
    }

}
