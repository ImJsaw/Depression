import * as Define from "./Define";
import Game from "./Game";
import MsgMgr from "./MsgMgr";
import UIMgr from "./UIMgr";

const { ccclass, property, executionOrder } = cc._decorator;

@ccclass
export default class EventMgr {
    private bringToSchool = 0;
    onTriggerObject(objName: string) {

        switch (objName) {
            case "obj":
                // Define.GameInfo.Inst.curIGState
                break;
            case "keys":
                this.bringToSchool += 1;
                if (this.bringToSchool == 3) {
                    this.play("goToSchool");
                    //漸暗
                    Define.GameInfo.Inst.curRealityScene = Define.RealityScene.school;
                    UIMgr.Inst.realityMgr.changeScene(Define.GameInfo.Inst.curRealityScene);
                    //漸亮
                }
                break;
            case "wallet":
                this.bringToSchool += 1;
                break;
            case "books":
                this.bringToSchool += 1;
                break;
                case "switch":
                    
                break;
            default:

                break;
        }
    }

    play(name: string) {
        cc.find('Canvas/Msg').getComponent('MsgMgr').play(name);
    }
}
