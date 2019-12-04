import Game from "../Game";

const { ccclass, property } = cc._decorator;

/**可互動物件 */
@ccclass
export default class Clue extends cc.Component {

    @property(cc.String)
    objName : string = "";
    
    onClick(){
        Game.Inst.eventMgr.onTriggerObject(this.objName);
    }
}
