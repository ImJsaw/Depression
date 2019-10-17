import MiscHelper from "./MiscHelper";

const { ccclass, property } = cc._decorator;

export enum GameState {
    Start = 1,
    Loading = 2,
    Game = 3,
    End = 99
}

/**
 * 主遊戲流程管理物件
 */
@ccclass
export default class MainStateMgr extends cc.Component {
    /**當前主遊戲狀態 */
    private _currentState: GameState;

    /**取得當前主遊戲狀態 */
    public get currentState(): GameState {
        return this._currentState;
    }

    init(){
        this.node = new cc.Node("MainStageMgr");
        this._currentState = GameState.Start;
    }

    /**
     * preload其他GameState的物件
     * @param state 要preload的GameState編號
     * @param onfinished 執行結束後要觸發的event
     */
    preloadState(state: GameState, onfinished?) {
        cc.director.preloadScene(MiscHelper.getSceneName(state),onfinished);
    }

    /**
     * 轉換至其他GameState
     * @param state 要轉換的GameState編號
     */
    changeState(state: GameState) {
        cc.director.loadScene(MiscHelper.getSceneName(state));
        switch (state) {
            case GameState.Start:
                cc.log("[MainStateMgr]Now change to start scene");
                break;
            case GameState.Game:
                cc.log("[MainStateMgr]Now change to game scene");
                break;
            case GameState.End:
                cc.log("[MainStateMgr]Now change to end scene");
                break;
            default:
                break;
        }
        this._currentState = state;
    }
}
