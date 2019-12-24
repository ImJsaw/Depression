const { ccclass, property } = cc._decorator;
import * as Define from "./Define";
import UIMgr from "./UIMgr";

@ccclass
export default class MsgEvents extends cc.Component {

    @property(cc.Node) demo: cc.Node = null;

    example() {
        window['stopScript']()
        cc.log("adfs")
    }
    stop() {
        window['stopScript']()

    }
    help() {
        this.demo.active = false
    }

    ingore() {
        this.demo.active = true
    }
    strongAndFatEnd() {
        let backetballCourt = cc.find("Canvas/centerAnchor/reality/bridge/backetballCourt");
        backetballCourt.getChildByName("strongAndFat").active = false;
    }
    goToSchool() {
        window['stopScript']()
        Define.GameInfo.Inst.curRealityScene = Define.RealityScene.school;
        UIMgr.Inst.realityMgr.changeScene(Define.GameInfo.Inst.curRealityScene, true);

    }

    goToHome() {
        window['stopScript']()
        Define.GameInfo.Inst.curRealityScene = Define.RealityScene.home;
        UIMgr.Inst.realityMgr.changeScene(Define.GameInfo.Inst.curRealityScene, true);
        cc.find('Canvas/Msg').getComponent('MsgMgr').play("backToHome");
    }

    princessAndBad() {
        window['stopScript']()
        cc.find('Canvas/Msg').getComponent('MsgMgr').play("princessAndBad");
    }
}