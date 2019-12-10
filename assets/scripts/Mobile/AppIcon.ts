import Converter, * as Define from "../Define";
import Game from "../Game";
import AppMgr from "./AppMgr";
import UIMgr from "../UIMgr";

const {ccclass, property} = cc._decorator;


@ccclass
export default class AppIcon extends cc.Component {
    
    @property({type:cc.Enum(Define.Apps),serializable:true})
    app : Define.Apps = Define.Apps.None;
    
    @property(cc.Sprite)
    appIcon : cc.Sprite = null;

    @property(cc.Label)
    appName : cc.Label = null;

    start(){
        // this.appIcon.spriteFrame = Game.Inst.resourcesMgr.load(Converter.getAppIconName(this.app));
        if(this.appName != null)
            this.appName.string = Converter.getAppName(this.app);
    }


    enterApp(){
        AppMgr.Inst.startApp(this.app);
        UIMgr.Inst.mobileMgr.notifyMenu.isShow(false);
    }
}
