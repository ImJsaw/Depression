import GameMgrBase from "./components/GameMgrBase";
import Converter ,* as Define from "./Define";
import UIMgr from "./UIMgr";
import Game from "./Game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMgr extends GameMgrBase {
    start() {
        this.init();

    }

    startStateMachine() {
        this.FSM.setState(Define.GameState.Reality);
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
