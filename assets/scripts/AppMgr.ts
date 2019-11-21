import line from "./components/app/line";
import gMap from "./components/app/gMap";
import * as Define from "./Define";
import App from "./components/App";
import instagram from "./components/app/instagram";
import MobileUIMgr from "./UI/MobileUIMgr";
import UIMgr from "./UIMgr";
import scheduler from "./components/app/scheduler";
import photo from "./components/app/photo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AppMgr extends cc.Component {

    @property(line)
    line : line = null;
    
    @property(instagram)
    ig : instagram = null;

    @property(gMap)
    map : gMap = null;

    @property(scheduler)
    scheduler : scheduler = null;
    
    @property(photo)
    photos : photo = null;

    private appList : App[] = [];

    private curAppID : Define.Apps = Define.Apps.None;

    private static instance: AppMgr;

    /**
     * 取得遊戲主控端
     */
    static get Inst(): AppMgr {
        if (!AppMgr.instance) {
            return undefined;
        }
        return this.instance;
    }

    onLoad(){
        AppMgr.instance = this;
        //make appList
        this.appList[Define.Apps.Lime] = this.line;
        this.appList[Define.Apps.IG] = this.ig;
        this.appList[Define.Apps.Map] = this.map;
        this.appList[Define.Apps.Photo] = this.photos;
        this.appList[Define.Apps.Sceduler] = this.scheduler;
    }
    
    startApp(appID : Define.Apps){
        if(appID != Define.Apps.None){
            this.curAppID = appID;
            UIMgr.Inst.mobileMgr.pageMgr.setFocus(false);
            this.appList[this.curAppID].startApp();
        }
    }

    /**
     * 當按下返回鍵時呼叫
     */
    endApp(){
        cc.log("call end app");
        if(this.curAppID != Define.Apps.None){
            this.endAppAnime();
            this.appList[this.curAppID].endApp();
            //return focus to pageMgr
            UIMgr.Inst.mobileMgr.pageMgr.setFocus(true);
        }
    }
    
    /**
     * app畫面縮小動畫
     */
    endAppAnime(){
        let appNode : cc.Node = this.appList[this.curAppID].node;
        let action = cc.sequence(
            cc.spawn(
                cc.scaleTo(0.1, 0).easing(cc.easeCubicActionOut()),
                cc.fadeTo(0.1,0).easing(cc.easeCubicActionIn()),
            ),
            cc.callFunc(()=>{
                appNode.children.forEach( (element)=>element.active  = false);
            })
        )
        appNode.runAction(action);

    }
}
