import NotifyMenu from "../Mobile/NotifyMenu";
import UIMgr from "../UIMgr";
import PageMgr from "../Mobile/PageMgr";
import * as Define from "../Define";
import Game from "../Game";
import Mobile from "../FSM/Mobile";
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

    @property(Mobile)
    mobileStateMachine : Mobile = null;

    onLoad() {
        this.mobileRoot.active = true;
        this.appRoot.active = true;
        this.notifyMenu.node.active = true;
        this.showMobileUI(false);
    }

    showMobileUI( isOn : boolean){
        if( isOn) {
            this.mobileRoot.opacity = 255;
            this.mobileRoot.y+=2000;
            //this.mobileRoot.children.forEach(node=>node.active=true)
        }
        else {
            this.mobileRoot.opacity = 0;
            this.mobileRoot.y-=2000;
            //this.mobileRoot.children.forEach(node=>node.active=false)
        }
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
                if(onFinished != undefined) onFinished();
            });
        }
    }

    gotoReality(){
        this.mobileStateMachine.backReality();
    }

    gotoPost(){
        this.mobileStateMachine.gotoPost();
    }
    
}
