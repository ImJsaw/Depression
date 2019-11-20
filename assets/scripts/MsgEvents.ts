const {ccclass, property} = cc._decorator;

@ccclass
export default class MsgEvents extends cc.Component {

    @property(cc.Node) demo:cc.Node=null;

    example() {
        window['stopScript']()
        cc.log("adfs")
    }

    help(){
        this.demo.active=false
    }

    ingore(){
        this.demo.active=true
    }
}