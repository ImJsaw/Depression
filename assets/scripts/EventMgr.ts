import * as Define from "./Define";
import Game from "./Game";
import MsgMgr from "./MsgMgr";
import UIMgr from "./UIMgr";

enum ScenarioState {
    Ch1_1, Ch1_2
}
const { ccclass, property, executionOrder } = cc._decorator;

@ccclass
export default class EventMgr {
    private scenario: ScenarioState = ScenarioState.Ch1_1;
    private bringToSchool = 0;
    checkChapter1_1(callingNode: cc.Node) {
        if (this.bringToSchool == 4) {
            this.scenario = ScenarioState.Ch1_2;
            // let clues = cc.find('Canvas/centerAncher/realty/home').getComponentsInChildren('Clue');
            // clues.forEach(element => {
            // });
            //漸暗
            Define.GameInfo.Inst.curRealityScene = Define.RealityScene.school;
            UIMgr.Inst.realityMgr.changeScene(Define.GameInfo.Inst.curRealityScene);
            //漸亮
        }
    }
    onTriggerObject(callingNode: cc.Node, objName: string) {
        if (objName == "") return;
        switch (this.scenario) {
            case ScenarioState.Ch1_1:
                this.play('Ch1-1_' + objName);
                switch (objName) {
                    case "obj":
                        // Define.GameInfo.Inst.curIGState
                        break;
                    case "phone":
                    case "key":
                    case "wallet":
                    case "book":
                        this.bringToSchool += 1;
                        callingNode.destroy();
                        if (this.bringToSchool == 4) {
                            let myRoom = callingNode.parent.parent.getChildByName('myRoom');
                            myRoom.getChildByName('bag').name = "complete";
                        }
                        break;
                    case "complete":
                        // this.checkChapter1_1(callingNode);
                        if (this.bringToSchool == 4) {
                            livingRoom.getChildByName('goToLeadingRoleRoom').active = true;
                            livingRoom.getChildByName('door').destroy();
                            this.scenario = ScenarioState.Ch1_2;
                            Define.GameInfo.Inst.curRealityScene = Define.RealityScene.school;
                            UIMgr.Inst.realityMgr.changeScene(Define.GameInfo.Inst.curRealityScene);

                        }
                        return;
                    default:
                        break;
                }
                break;
            case ScenarioState.Ch1_2:
                break;
        }
    }

    play(name: string) {
        cc.find('Canvas/Msg').getComponent('MsgMgr').play(name);
    }
}
