// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

export enum cursorType{
    None = -1,
    Item,
    Door,
    Character
}

@ccclass
export default class GhostCursor extends cc.Component {
    @property({type:cc.Enum(cursorType),serializable:true})
    type : cursorType = cursorType.Item;
    
    start() {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
    }

    onMouseLeave(_) {
        this.dropTip();
    }

    onMouseMove(evt) {
        evt.stopPropagation()
        let mousePosition = this.node.convertToNodeSpaceAR(evt.getLocation()).add(this.node.parent.position);
        //let mousePosition = evt.getLocation();
        mousePosition = mousePosition.add(this.node.position);
        this.moveTip(mousePosition);
        // cc.find('Canvas/Cursor').setPosition(mousePosition.x, mousePosition.y)
    }
    
    onMouseDown(_) {
        this.dropTip();
    }

    moveTip(pos : cc.Vec2){
        switch(this.type){
            case cursorType.Character:
                cc.find('Canvas/CharacterCursor').setPosition(pos);
                return;
            case cursorType.Door:    
                cc.find('Canvas/DoorCursor').setPosition(pos);
                return;    
            case cursorType.Item:
                cc.find('Canvas/ItemCursor').setPosition(pos);
                return;
        }
    }

    dropTip(){
        switch(this.type){
            case cursorType.Character:
                cc.find('Canvas/CharacterCursor').setPosition(-4096, -2048);
                return;
            case cursorType.Door:    
                cc.find('Canvas/DoorCursor').setPosition(-4096, -2048);
                return;    
            case cursorType.Item:
                cc.find('Canvas/ItemCursor').setPosition(-4096, -2048);
                return;
        }
    }

}
