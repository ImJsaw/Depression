import Page from "../components/Page";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PageMgr extends cc.Component {

    private duration : number = 0.2;

    private left : cc.Vec2 = new cc.Vec2(-600, 0);
    private right : cc.Vec2 = new cc.Vec2(600, 0);
    
    private delta : cc.Vec2 = new cc.Vec2(0,0);
    //觸發拖曳閾值
    private threshold : number = 200;
    /**目前頁面 0左1中2右*/
    private curPageNum : number = 1;
    private maxPageNum : number = 2;

    onLoad(){
        // this.regDragEvent();
    }

    start () {
    }

    regDragEvent(){
        // //register touch event
        // let self = this;
        // this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
        //     //reset delta
        //     self.delta = new cc.Vec2(0,0);
        // });
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
        //     let delta = event.touch.getDelta();
        //     self.delta.x += delta.x;
        //     self.delta.y += delta.y;
        //     //make every page move with touch
        //     self.node.children.forEach(element=>element.x += delta.x);
        // });
        // this.node.on(cc.Node.EventType.TOUCH_END, function () {
        //     // cc.log("[Page]delta : " + self.delta.x + " , " + self.delta.y+"curPage"+self.curPageNum);
        //     if( Math.abs(self.delta.x) > self.threshold){
        //         self.movePage(self.delta.x);
        //     }
        //     else{
        //         self.backToOrigin();
        //     }
        // });
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
        //     if( Math.abs(self.delta.x) > self.threshold){
        //         self.movePage(self.delta.x);
        //     }
        //     else{
        //         self.backToOrigin();
        //     }
        // });
    }

    unRegDragEvent(){
        this.node.off(cc.Node.EventType.TOUCH_START);
        this.node.off(cc.Node.EventType.TOUCH_MOVE);
        this.node.off(cc.Node.EventType.TOUCH_END);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL);
    }

    backToOrigin(){
        cc.warn("[Page] back to origin");
        this.node.children.forEach(element=> element.getComponent(Page).backToOrigin(this.delta.x));
    }

    movePage(deltaX : number){
        let moveToRight :boolean = deltaX > 0;
        if(moveToRight && this.curPageNum > 0){
            this.moveRight(deltaX);
            this.curPageNum--;
        }
        else if(!moveToRight && this.curPageNum < this.maxPageNum){
            this.moveLeft(deltaX);
            this.curPageNum++;
        }
        else {
            this.backToOrigin();
        }
    }

    moveRight(deltaX : number){
        this.node.children.forEach(element=> element.getComponent(Page).moveRight(deltaX));
    }

    moveLeft(deltaX : number){
        this.node.children.forEach(element=> element.getComponent(Page).moveLeft(deltaX));
    }

    //disable moves when not focus
    setFocus(isFocus : boolean = false){
        if(isFocus){
            this.node.children.forEach((element)=>element.active = isFocus);
            // this.regDragEvent();
            return;
        }
        // this.unRegDragEvent();
        this.node.children.forEach((element)=>element.active = isFocus);
    }
}
