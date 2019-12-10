import * as Define from "./Define";
import Game from "./Game";
import MsgMgr from "./MsgMgr";
import UIMgr from "./UIMgr";

enum ScenarioState {
    Ch1_1, Ch1_2, Ch1_3
}
const { ccclass, property, executionOrder } = cc._decorator;

@ccclass
export default class EventMgr {
    private scenario: ScenarioState = ScenarioState.Ch1_1;
    private bringToSchool = 0;
    private clickCard = false;
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
        if (objName == "default") {
            this.play(callingNode.name);
            return;
        }

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
                            let livingRoom = callingNode.parent.parent.getChildByName('overview');
                            livingRoom.getChildByName('goToLeadingRoleRoom').active = true;
                            livingRoom.getChildByName('door').destroy();
                            this.scenario = ScenarioState.Ch1_2;
                            Define.GameInfo.Inst.curRealityScene = Define.RealityScene.school;
                            UIMgr.Inst.realityMgr.changeScene(Define.GameInfo.Inst.curRealityScene, true);

                        }
                        return;
                    default:
                        break;
                }
                break;
            case ScenarioState.Ch1_2:
                if (this.clickCard == false)
                    this.play('Ch1-2_' + objName + '_1');
                else
                    this.play('Ch1-2_' + objName + '_2');

                switch (objName) {
                    case "angryPrincess":
                        callingNode.destroy();
                        break;
                    case "card":
                        this.clickCard = true;
                        break;
                }
                break;
            case ScenarioState.Ch1_3:
                this.play('Ch1-3_' + objName);
                switch (objName) {
                    case "":
                        callingNode.destroy();
                        break;
                    case "":
                        this.clickCard = true;
                        break;
                }
                break;
        }
    }
    play(name: string) {
        cc.find('Canvas/Msg').getComponent('MsgMgr').play(name);
    }

    public screenUnlock() {
        if (this.scenario == ScenarioState.Ch1_1) {
            let livingRoom = cc.find("Canvas/centerAncher/reality/home/livingRoom");
            livingRoom.getChildByName('goToLeadingRoleRoom').active = true;
            livingRoom.getChildByName('door').destroy();

            this.play('Ch1-1_jumpToCh1-3');
            this.scenario = ScenarioState.Ch1_3;
        }
        else if (this.scenario == ScenarioState.Ch1_2) {
            this.play('Ch1-2_complete');
            
            this.scenario = ScenarioState.Ch1_3;
            Define.GameInfo.Inst.curRealityScene = Define.RealityScene.home;
            UIMgr.Inst.realityMgr.changeScene(Define.GameInfo.Inst.curRealityScene, true);

        }
    }
}
