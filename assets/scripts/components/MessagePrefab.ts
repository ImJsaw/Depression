const { ccclass, property } = cc._decorator;

/**提示視窗物件 */
@ccclass
export default class MessagePrefab extends cc.Component {

    private duration : number = 0.2;

    private down : cc.Vec2 = new cc.Vec2(0, -200);
    private up : cc.Vec2 = new cc.Vec2(0, 200);

    
    private delta : cc.Vec2 = new cc.Vec2(0,0);
    private startPos : cc.Vec2 = new cc.Vec2(0,0);
    private endPos : cc.Vec2 = new cc.Vec2(0,0);
    //觸發拖曳閾值
    private threshold : number = 200;
    
    onLoad() {
        let self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            //reset delta
            self.delta = new cc.Vec2(0,0);
            //log start point
            self.startPos = event.getLocation();
        });
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var delta = event.touch.getDelta();
            self.delta.x += delta.x;
            self.node.x += delta.x;
            self.delta.y += delta.y;
        });
        //release mouse inside
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            cc.log("delta : " + self.delta.x + " , " + self.delta.y);
            //log start point
            self.endPos = event.getLocation();
            if( self.delta.x > self.threshold){
                cc.log("remove!");
                self.node.destroy();
            }
            else{
                self.backToOrigin();
            }
        });
        //release mouse outside
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            self.backToOrigin();
        });
    }

    moveDown(){
        let action = cc.moveBy(this.duration, this.down ).easing(cc.easeCubicActionInOut())
        this.node.runAction(action);
    }

    remove( onFinished? ){
        let self = this;
        let action = cc.sequence(
            cc.moveBy(this.duration, this.down ).easing(cc.easeCubicActionInOut()),
            cc.callFunc(()=> {
                if(onFinished != undefined){
                    onFinished();
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

}
