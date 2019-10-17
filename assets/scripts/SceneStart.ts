import Game from "./Game";
import { GameState } from "./MainStateMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneStart extends cc.Component {

    onLoad(){
        cc.view.enableAntiAlias(true);

        Game.Inst.init = true;
        Game.Inst.utils.resize();
    }

    enterGame(){
        Game.Inst.mainStateMgr.changeState(GameState.Loading);
    }
}
