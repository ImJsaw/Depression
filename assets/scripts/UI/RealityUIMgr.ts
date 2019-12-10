import * as Define from "../Define";
import RealityChild from "../components/RealityChild";
import Reality from "../FSM/Reality";
import UIMgr from "../UIMgr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class RealityUIMgr extends cc.Component {


    @property(cc.Node)
    realityRoot: cc.Node = null;

    @property(Reality)
    realityStateMachine: Reality = null;

    private onTransition: boolean = false;

    onLoad() {
        this.showRealityUI(false);
        this.onTransition = false;
    }

    showRealityUI(isOn: boolean) {
        if (isOn)
            this.realityRoot.children.forEach((element) => element.active = true);
        else
            this.realityRoot.children.forEach((element) => element.active = false);
    }

    changeScene(sceneName: Define.RealityScene, transiton: boolean = false, onBlack?) {
        //avoid repeat clicking map issue
        if (this.onTransition && transiton) return;
        this.onTransition = true;
        let self = this;
        if (!transiton) {
            this.gotoScene(sceneName);
            this.onTransition = false;
            return;
        }
        UIMgr.Inst.transitionAnim(() => {
            if (onBlack != undefined) onBlack();
            Define.GameInfo.Inst.curRealityScene = sceneName;
            UIMgr.Inst.mobileMgr.gotoReality();
        }, () => {
            self.onTransition = false;
        })

    }

    private gotoScene(sceneName: Define.RealityScene) {
        Define.GameInfo.Inst.curRealityScene = sceneName;
        this.realityRoot.children.forEach((element) => {
            if (element.getComponent(RealityChild).getSceneName() == sceneName) {
                element.active = true;
                element.children.forEach(node => {
                    if (node.name == "overview")
                        node.active = true;
                    else
                        node.active = false;
                })
            }
            else
                element.active = false;
        })
    }

    openMobile() {
        this.realityStateMachine.openMobile();
    }
}
