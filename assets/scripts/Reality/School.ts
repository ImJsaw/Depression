import LongAxis from "../LongAxisMgr";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class School extends cc.Component {

    goToClassroom(){
        this.node.children.forEach(node => node.active = false)
        this.node.getChildByName("classroom").active = true
        this.getComponent(LongAxis).enabled = false
    }
    goToClassroomBack(){
        this.node.children.forEach(node => node.active = false)
        this.node.getChildByName("classroomBack").active = true
        this.getComponent(LongAxis).enabled = false
    }

    goToHallway(){
        this.node.children.forEach(node => node.active = false)
        this.node.getChildByName("hallway").active = true
        this.getComponent(LongAxis).enabled = true
    
    }
    goToHallwayBack(){
        this.node.children.forEach(node => node.active = false)
        this.node.getChildByName("hallwayBack").active = true
        this.getComponent(LongAxis).enabled = true
    
    }

    goToLocker(){
        this.node.children.forEach(node => node.active = false)
        this.node.getChildByName("locker").active = true
        this.getComponent(LongAxis).enabled = false
    
    }

}
