
const { ccclass, property } = cc._decorator;

/**提示視窗物件 */
@ccclass
export default class LineMsgPrefab extends cc.Component {

    @property(cc.Sprite)
    icon : cc.Sprite = null;

    private duration : number = 0.2;

    private down : cc.Vec2 = new cc.Vec2(0, -200);
    private up : cc.Vec2 = new cc.Vec2(0, 200);

    private isIconFocus : boolean = false;
    private isMsgFocus : boolean = false;

    /** handle long click/short click  */
    private startTouchTime : number = -1 ;

    memberID : number = 0;
    
    
    onLoad() {
        //register touch event
        let self = this;
        this.icon.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            //reset timer
            self.startTouchTime = new Date().getTime();
        });
        this.icon.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            //reset timer
            cc.log("duration : "+  (new Date().getTime() - self.startTouchTime) );
            self.showProfile();
        });

        this.node.on(cc.Node.EventType.TOUCH_END, function () {
           self.showMsgDetail();
        });

    }

    init( memberID: number){
        this.memberID = memberID;
        //set image
    }

    moveDown(){
        let action = cc.moveBy(this.duration, this.down ).easing(cc.easeCubicActionInOut())
        this.node.runAction(action);
    }

    moveUp(){
        let action = cc.moveBy(this.duration, this.up ).easing(cc.easeCubicActionInOut())
        this.node.runAction(action);
    }

    /**
     * 顯示頭像主人資料
     */
    showProfile(){

    }

    /**
     * 查看訊息內容
     */
    showMsgDetail(){
        //demo
        this.node.getChildByName("msgDetail").active = true
    }

    hideMsgDetail(){
        //demo
        this.node.getChildByName("msgDetail").active = false
    }
}
