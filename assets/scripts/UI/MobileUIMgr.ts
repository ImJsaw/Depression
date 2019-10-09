
const { ccclass, property } = cc._decorator;

@ccclass
export default class MobileUIMgr extends cc.Component {


    @property(cc.Node) 
    mobileRoot: cc.Node = null;

    private delta : cc.Vec2 = new cc.Vec2(0,0);
    private startPos : cc.Vec2 = new cc.Vec2(0,0);
    private endPos : cc.Vec2 = new cc.Vec2(0,0);
    //觸發拖曳閾值
    private threshold : number = 20;

    onLoad() {
        this.showMobileUI(false);

        this.setDragEvent();
    }

    showMobileUI( isOn : boolean){
        if( isOn) 
            this.mobileRoot.opacity = 255;
        else 
            this.mobileRoot.opacity = 0;
    }

    setDragEvent(){
        cc.log(this.mobileRoot);
        this.mobileRoot.on(cc.Node.EventType.TOUCH_START, function (event) {
            // cc.log("start");
            //reset delta
            this.delta = new cc.Vec2(0,0);
            //log start point
            this.startPos = event.getLocation();
        }, this);
        this.mobileRoot.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var delta = event.touch.getDelta();
            this.delta.x += delta.x;
            this.delta.y += delta.y;
        }, this);
        //release mouse inside
        this.mobileRoot.on(cc.Node.EventType.TOUCH_END, function (event) {
            cc.log("delta : " + this.delta.x + " , " + this.delta.y);
            //log start point
            this.endPos = event.getLocation();
            if( Math.abs(this.delta.x) > this.threshold && Math.abs(this.delta.y) > this.threshold ){
                this.dragEvent( this.startPos, this.endPos );
            }
        }, this);
        //release mouse outside
        this.mobileRoot.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            // cc.log("drag cancel");
        }, this);
    }

    dragEvent(start : cc.Vec2, end : cc.Vec2){
        cc.log("drag trigger");
    }
}
