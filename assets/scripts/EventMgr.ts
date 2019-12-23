import * as Define from "./Define";
import Game from "./Game";
import MsgMgr from "./MsgMgr";
import UIMgr from "./UIMgr";

enum ScenarioState {
    Ch1_1, Ch1_2, Ch1_3, Ch2, Ch3
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
        cc.log(objName);
        if (objName == "") return;
        if (objName == "default") {
            this.play(callingNode.getComponent("Clue").objName);
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
                            callingNode.name = "bag";
                            let livingRoom = cc.find("Canvas/centerAnchor/reality/home/overview");
                            livingRoom.getChildByName('goToLeadingRoleRoomBack').active = true;
                            livingRoom.getChildByName('door').destroy();
                            this.scenario = ScenarioState.Ch1_2;
                            // Define.GameInfo.Inst.curRealityScene = Define.RealityScene.school;
                            // UIMgr.Inst.realityMgr.changeScene(Define.GameInfo.Inst.curRealityScene, true);


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
            case ScenarioState.Ch2:
                this.play('Ch2_' + objName);
                switch (objName) {
                }
                break;
            case ScenarioState.Ch3:
                this.play('Ch3_' + objName);
                switch (objName) {
                }
                break;

        }
    }
    play(name: string) {
        cc.find('Canvas/Msg').getComponent('MsgMgr').play(name);
    }

    public screenUnlock() {
        if (this.scenario == ScenarioState.Ch1_1) {
            let livingRoom = cc.find("Canvas/centerAnchor/reality/home/overview");
            livingRoom.getChildByName('goToLeadingRoleRoomBack').active = true;
            livingRoom.getChildByName('door').active = false;
            livingRoom.getChildByName('door').destroy();
            cc.find('Canvas/centerAnchor/reality/school/overview/angryPrincess').destroy();
            this.play('Ch1-1_jumpToCh1-3');
            this.scenario = ScenarioState.Ch1_3;
        }
        else if (this.scenario == ScenarioState.Ch1_2) {
            this.scenario = ScenarioState.Ch1_3;
            this.play('Ch1-2_complete');

            // Define.GameInfo.Inst.curRealityScene = Define.RealityScene.home;
            // UIMgr.Inst.realityMgr.changeScene(Define.GameInfo.Inst.curRealityScene, true);

        }
    }
    public connectWifi() {
        this.play('connectWifi');
        this.scenario = ScenarioState.Ch2;
        let livingRoom = cc.find("Canvas/centerAnchor/reality/home/overview");
        livingRoom.getChildByName('goToLeadingRoleRoomBack').destroy();

        let hallway = cc.find("Canvas/centerAnchor/reality/school/hallway");
        hallway.getChildByName("goToLocker").active = false;
        hallway.getChildByName("items").active = false;
        hallway.getChildByName("goToClassroom").active = false;
        hallway.getChildByName("goToClassroomBack").active = true;

    }
    public Ch2Complete() {
        this.play('Ch2Complete');
        this.scenario = ScenarioState.Ch3;

        let mountain = cc.find("Canvas/centerAnchor/reality/mountain/overview");
        mountain.getChildByName("fatBoyBack").active = false;
        mountain.getChildByName("strongBoy").active = false;

        let school = cc.find("Canvas/centerAnchor/reality/school/overview");
        school.getChildByName("goToHallway").active = false;
        school.getChildByName("goToHallwayBack").active = true;

        let classroom = cc.find("Canvas/centerAnchor/reality/school/classroom");
        classroom.getChildByName("goToHallway").active = false;
        classroom.getChildByName("goToHallwayBack").active = true;

        let bridge = cc.find("Canvas/centerAnchor/reality/bridge/overview");
        bridge.getChildByName("goToBasketballCourt").active = true;

        let street = cc.find("Canvas/centerAnchor/reality/street/overview");
        street.getChildByName("badBoyBack").active = false;
        street.getChildByName("princessBack").active = false;
        street.getChildByName("goToCafe").active = true;
        street.getChildByName("goToCafeBack").active = false;

    }

}
