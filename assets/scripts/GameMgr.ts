import GameMgrBase from "./components/GameMgrBase";
import Converter ,* as Define from "./Define";
import UIMgr from "./UIMgr";
import Game from "./Game";

const { ccclass, property, executionOrder} = cc._decorator;

@ccclass
@executionOrder(-1)
export default class GameMgr extends GameMgrBase {
    start() {
        this.init();
    }

    async startStateMachine() {
        this.FSM.setState(Define.GameState.Reality);
        let msgMgr = cc.find('Canvas/Msg').getComponent('MsgMgr')
        await cc.find('Canvas/Msg').getComponent('MsgMgr').load('腳本/scenario');
        msgMgr.play("momCall");
        //BGM
        // Game.Inst.audioMgr.playBGM("");
    }

    quitBtnClick() {
        cc.log("QUIT");

    }

    quitGame() {
        cc.log("End");
    }

}
