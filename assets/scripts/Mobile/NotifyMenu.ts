
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    root : cc.Node = null;

    private showPos : cc.Vec2 = new cc.Vec2(0,0);
    private hidePos : cc.Vec2 = new cc.Vec2(0,1000);
    /**animation duration */
    private duration : number = 1;

    onLoad(){
        this.root.position = this.hidePos;
    }

    start () {

    }

    showUI(isOn : boolean){
        let start : cc.Vec2;
        let end : cc.Vec2;
        if( isOn){
            start = this.hidePos;
            end = this.showPos;
        }
        else {
            start = this.showPos;
            end = this.hidePos;
        }

        let action = cc.sequence(
            cc.moveTo(0,start),
            cc.moveTo(this.duration, end)
        )
        this.root.runAction(action);
    }

}
