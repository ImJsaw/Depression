import Game from "../Game";
import { GameState } from "../MainStateMgr";

const { ccclass, property } = cc._decorator;

/**可互動物件 */
@ccclass
export default class Clue extends cc.Component {

    @property(cc.String)
    objName: string = "";

    onClick() {
        // Game.Inst.eventMgr.onTriggerObject(this.node, this.objName);
        Game.Inst.eventMgr.onTriggerObject(this.node, this.node.name);
    }

    goToPostKTV() {
        cc.find("GameMgr/FSM").getComponent("Mobile").gotoPost();
        let post = cc.find("Canvas/centerAnchor/post");
        post.children.forEach(element => {
            if (element.name == "KTV")
                element.active = true;
            else
                element.active = false;
        });
        post.getChildByName("openMobile").active = true;
    }
    goToPostRoom() {
        cc.find("GameMgr/FSM").getComponent("Mobile").gotoPost();
        let post = cc.find("Canvas/centerAnchor/post");
        post.children.forEach(element => {
            if (element.name == "room")
                element.active = true;
            else
                element.active = false;
        });
        post.getChildByName("openMobile").active = true;
    }
    ending(){
        Game.Inst.mainStateMgr.changeState(GameState.End);
    }
    disable() {
        // this.node.active = false;
    }
}
