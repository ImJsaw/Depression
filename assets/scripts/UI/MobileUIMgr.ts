import NotifyMenu from "../Mobile/NotifyMenu";
import UIMgr from "../UIMgr";
import PageMgr from "../Mobile/PageMgr";
import * as Define from "../Define";
import Game from "../Game";
const { ccclass, property } = cc._decorator;

@ccclass
export default class MobileUIMgr extends cc.Component {


    @property(cc.Node) 
    mobileRoot: cc.Node = null;

    @property(cc.Node) 
    appRoot: cc.Node = null;
    
    @property(NotifyMenu)
    notifyMenu : NotifyMenu = null;

    @property(PageMgr)
    pageMgr : PageMgr = null;

    onLoad() {
        this.mobileRoot.active = true;
        this.appRoot.active = true;
        this.notifyMenu.node.active = true;
        this.showMobileUI(false);
    }

    showMobileUI( isOn : boolean){
        if( isOn) 
            this.mobileRoot.opacity = 255;
        else 
            this.mobileRoot.opacity = 0;
    }

    showNotifyMenu(isOn : boolean, onFinished?){
        //stop pageEvent when open notifyMenu
        if(isOn) {
            this.pageMgr.unRegDragEvent();
            this.notifyMenu.isShow(isOn, onFinished);
        }
        else {
            this.notifyMenu.isShow(isOn, ()=>{
                this.pageMgr.regDragEvent();
                onFinished();
            });
        }
    }
    
}
