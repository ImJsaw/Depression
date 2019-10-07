import Game, { GameID } from "../Game";
import { GameState } from "../MainStateMgr";
import FSM from "./FSM";
import StateBase from "./StateBase";

const { ccclass, property } = cc._decorator;

/**
 * 遊戲管理物件基底
 */
@ccclass
export default abstract class GameMgrBase extends cc.Component {

    /**狀態機 */
    private _FSM: FSM = null;

    /**取得當前狀態機 */
    public get FSM(): FSM {
        return this._FSM;
    }

    /**check if game init complete */
    initGameComplete: boolean = false;

    onLoad() {
        if (!Game.Inst.init) {
            Game.Inst.mainStateMgr.changeState(GameState.Start);
            return;
        }
        Game.Inst.utils.resize();
    }

    // use this for initialization
    init() {
        this._FSM = new FSM();
        Game.Inst.currentGameMgr = this;
    }

    update(dt: number) {
        if (!this.initGameComplete) {
            this.startStateMachine();
            this.initGameComplete = true;
        }
        this._FSM.update(dt);
    }

    /**重新開始遊戲 */
    restartGame(){
        this.initGameComplete = false;
    }

    onDestroy() {
        this.quitGame();
    }

    /**啟動StateMachine */
    abstract startStateMachine();

    /**當玩家點擊離開按鈕時觸發 */
    abstract quitBtnClick();

    /**離開遊戲時 */
    abstract quitGame();

    release(){
        this._FSM.release();       
        Game.Inst.mainStateMgr.changeState(GameState.End);
    }
}
