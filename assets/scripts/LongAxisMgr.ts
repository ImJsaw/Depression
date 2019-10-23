
const {ccclass, property} = cc._decorator;

@ccclass
export default class LongAxis extends cc.Component {


    onLoad (){
        // add key down and key up event
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    start () {

    }

    // update (dt) {}

    onKeyDown(event){
        switch(event.keyCode) {
            case cc.macro.KEY.left:
                console.log('Press <left>');
                this.node.x+=5;
                //this.node.children.forEach(element=>element.x += 10);
                break;
            case cc.macro.KEY.right:
                console.log('Press <right>');
                this.node.x -= 5;
                //this.node.children.forEach(element=>element.x -= 10);
                break;
    
                
        }
    }

    onKeyUp(event){
        switch(event.keyCode) {
            case cc.macro.KEY.left:
                console.log('<left> Release');
                break;
            case cc.macro.KEY.right:
                console.log('<right> Release');
                break;
    
        }
    }
}
