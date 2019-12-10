import Game from "./Game";
import { GameState } from "./MainStateMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneStart extends cc.Component {

    @property(cc.Node)
    start1 : cc.Node = null;

    @property(cc.Node)
    start2 : cc.Node = null;

    @property(cc.Node)
    startButton : cc.Node = null;

    onLoad(){
        cc.view.enableAntiAlias(true);

        Game.Inst.init = true;
        Game.Inst.utils.resize();

        this.regEvent();
    }

    regEvent(){
        let self = this;
        this.startButton.on(cc.Node.EventType.MOUSE_ENTER, function (event) {
            self.start2.active = true;
        });

        this.startButton.on(cc.Node.EventType.MOUSE_LEAVE, function (event) {
            self.start2.active = false;
        });

        this.startButton.on(cc.Node.EventType.TOUCH_START, function (event) {
            self.enterGame();
        });

    }

    enterGame(){
        Game.Inst.mainStateMgr.changeState(GameState.Loading);
    }
}
