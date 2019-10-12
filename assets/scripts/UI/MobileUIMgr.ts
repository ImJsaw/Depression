import NotifyMenu from "../Mobile/NotifyMenu";
const { ccclass, property } = cc._decorator;

@ccclass
export default class MobileUIMgr extends cc.Component {


    @property(cc.Node) 
    mobileRoot: cc.Node = null;
    
    @property(NotifyMenu)
    notifyMenu : NotifyMenu = null;

    onLoad() {
        this.showMobileUI(false);
    }

    showMobileUI( isOn : boolean){
        if( isOn) 
            this.mobileRoot.opacity = 255;
        else 
            this.mobileRoot.opacity = 0;
    }

    showNotifyMenu(isOn){
        this.notifyMenu.showUI(isOn);
    }

    
}
