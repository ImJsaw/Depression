import * as Define from "./Define";
import Game from "./Game";

const { ccclass, property, executionOrder} = cc._decorator;

@ccclass
export default class EventMgr {
    
    onTriggerObject( objName : string){
        switch(objName){
            case "obj":
                // Define.GameInfo.Inst.curIGState
                break;
            default:
                break;
        }
    }

}
