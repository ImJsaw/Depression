import AudioMgr from "./AudioMgr";
import GameMgrBase from "./components/GameMgrBase";
import Utils from "./Utils";
import ResourcesMgr from "./ResourcesMgr";
import MainStateMgr from "./MainStateMgr";
import AnimationMgr from "./AnimationMgr";
import EventMgr from "./EventMgr";

export enum GameID {
    None = 0,
    Game
}

/**
 * 遊戲主要控制物件
 */
export default class Game {

    private static instance: Game;

    /**
     * 取得遊戲主控端
     */
    static get Inst(): Game {
        if (!Game.instance) {
            cc.view.enableAutoFullScreen(false);
            Game.instance = new Game();

            // initial all manager
            Game.instance.mainStateMgr = new MainStateMgr();
            Game.instance.mainStateMgr.init();
            Game.instance.resourcesMgr = new ResourcesMgr();
            Game.instance.animationMgr = new AnimationMgr();
            Game.instance.audioMgr = new AudioMgr();
            Game.instance.eventMgr = new EventMgr();
            Game.instance.audioMgr.init();
            Game.instance.utils = new Utils();
        }
        return this.instance;
    }

    public init: boolean = false;

    /**主遊戲流程管理 */
    public mainStateMgr: MainStateMgr;
    /**動畫管理 */
    public animationMgr: AnimationMgr;
    /**音樂管理 */
    public audioMgr: AudioMgr;
    /**觸發事件管理 */
    public eventMgr : EventMgr;
    /**動態資源管理 */
    public resourcesMgr: ResourcesMgr;
    /**通用功能 */
    public utils: Utils;

    /**紀錄當前遊戲管理者 */
    public currentGameMgr: GameMgrBase;

}
