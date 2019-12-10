import * as Define from "../../Define";
import App from "./App";
import Game from "../../Game";
import UIMgr from "../../UIMgr";

const {ccclass, property} = cc._decorator;


@ccclass
export default class wifi extends App {

    /**animation duration */
    private duration : number = 1;

    private offSet : number = 0;
    private maxOffSet : number = 2743;

    private showPW :string = "";
    private curNum : number = 0;

    private pw : number = 86519;

    @property(cc.Node)
    passwordUI : cc.Node = null;

    @property(cc.Label)
    pwTxt : cc.Label = null;

    onLoad(){
        this.node.scale = 0;
        this.node.opacity = 0;
        this.node.children.forEach( (element)=>{
            element.active  = false;
        } )
    }

    startApp(){
        //start anime
        cc.log("start WIFI");
        this.node.children.forEach( (element)=>element.active = true);
        let action = cc.spawn(
            cc.scaleTo(0.3, 1).easing(cc.easeCubicActionOut()),
            cc.fadeTo(0.3,255).easing(cc.easeCubicActionIn()),
        );
        this.node.runAction(action);
        this.reset();
        this.passwordUI.active = false;
        
    }

    openPassword(){
        this.passwordUI.active = true;
    }

    press(customData,n){
        let num : number = parseInt(n);

        this.pwTxt.string += "*";
        //update curPassword
        this.curNum = this.curNum*10 + num;
        cc.log("curPW : " + this.curNum);
    }

    checkPw(){
        if(this.curNum == this.pw){
            this.connectWifi();
            this.passwordUI.active = false;
        }
        else
            this.reset();
    }

    connectWifi(){
        if(Define.GameInfo.Inst.isWifiConnect) return;
        Define.GameInfo.Inst.isWifiConnect = true;
        UIMgr.Inst.mobileMgr.notifyMenu.setWifi(true);
        cc.log("connectWIFI");
        UIMgr.Inst.mobileMgr.notifyMenu.getNotify();
        UIMgr.Inst.mobileMgr.notifyMenu.getNotify();
        UIMgr.Inst.mobileMgr.notifyMenu.getNotify();
        UIMgr.Inst.mobileMgr.notifyMenu.getNotify();
    }

    reset(){
        this.pwTxt.string = "";
        //update curPassword
        this.curNum = 0;
    }

    del(){
        if(this.pwTxt.string.length > 0){
            this.pwTxt.string = this.pwTxt.string.slice(0,-1);
            this.curNum = Math.floor(this.curNum/10);
            cc.log("curPW : " + this.curNum);
        }
    }

    endApp(){
        cc.log("end WIFI");
    }
}
