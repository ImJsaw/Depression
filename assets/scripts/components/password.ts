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
export default class NewClass extends cc.Component {

    private count:number
    start () {
        this.count = 0
    }
    press(){
        if(this.count<4)
            this.count+=1
            
        let i = 0
        let color :cc.Color = cc.Color.BLACK
        while(i!=this.count)
        {
            this.node.children[i].color=color
            i+=1
        }
        if(this.count==4){
            this.count=0
            this.node.children.forEach(node=>node.color=cc.Color.WHITE)
        }
    }
    del(){
        if(this.count>0)
        {
            this.count-=1
            this.node.children[this.count].color=cc.Color.WHITE
        }
    }
    // update (dt) {}
}
