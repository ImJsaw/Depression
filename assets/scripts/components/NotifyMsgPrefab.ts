import NotifyMenu from "../Mobile/NotifyMenu";
import UIMgr from "../UIMgr";
const { ccclass, property } = cc._decorator;

/**提示視窗物件 */
@ccclass
export default class NotifyMsgPrefab extends cc.Component {

    /**流水號 */
    serialNum : number = 0;

    private duration : number = 0.2;

    private down : cc.Vec2 = new cc.Vec2(0, -124);
    private up : cc.Vec2 = new cc.Vec2(0, 124);
    
    private delta : cc.Vec2 = new cc.Vec2(0,0);
    //觸發拖曳閾值
    private threshold : number = 200;

    private notifyMenu : NotifyMenu = null;
    
    onLoad() {
        //register touch event
        let self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            //reset delta
            self.delta = new cc.Vec2(0,0);
        });
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            let delta = event.touch.getDelta();
            self.delta.x += delta.x;
            self.delta.y += delta.y;
            //make msg move with touch
            self.node.x += delta.x;
        });
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            cc.log("delta : " + self.delta.x + " , " + self.delta.y);
            if( self.delta.x > self.threshold){
                self.remove();
            }
            else{
                self.backToOrigin();
            }
        });
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            if( self.delta.x > self.threshold){
                self.remove();
            }
            else{
                self.backToOrigin();
            }
        });
    }

    init( serialNum: number){
        this.serialNum = serialNum;
        cc.log("generate"+serialNum+"msg");
        if(serialNum > this.node.childrenCount){
            cc.log("msg not set");
            return;
        }
        this.notifyMenu = UIMgr.Inst.mobileMgr.notifyMenu;
        this.node.children.forEach((element)=>element.active = false);
        this.node.children[serialNum].active = true;
    }

    moveDown(){
        let action = cc.moveBy(this.duration, this.down ).easing(cc.easeCubicActionInOut())
        this.node.runAction(action);
    }

    moveUp(){
        let action = cc.moveBy(this.duration, this.up ).easing(cc.easeCubicActionInOut())
        this.node.runAction(action);
    }

    remove( onFinished? ){
        let self = this;
        let action = cc.sequence(
            cc.moveBy(this.duration, new cc.Vec2(300,0) ).easing(cc.easeCubicActionInOut()),
            cc.callFunc(()=> {
                this.notifyMenu.removeMsg(this.serialNum);
                if(onFinished != undefined){
                    //onFinished();
                }
                self.node.destroy();
            })
        )
        this.node.runAction(action);
    }

    backToOrigin(){
        cc.log("back");
        let action = cc.moveBy(this.duration, new cc.Vec2( -this.delta.x,0) ).easing(cc.easeCubicActionInOut())
        this.node.runAction(action);
    }

    /**
     * get broadcast from manager
     * @param removedSerialNum removed msg serial number
     */
    removeBroadcast( removedSerialNum : number){
        if(this.serialNum < removedSerialNum){
            this.moveUp();
        }
    }

}
