import App from "../App";
import * as Define from "../../Define";

const {ccclass, property} = cc._decorator;


@ccclass
export default class gMap extends App {
    
    @property(cc.Node)
    UIRoot : cc.Node = null;

    onLoad(){
        this.node.scale = 0;
        this.node.opacity = 0;
        this.node.children.forEach( (element)=>{
            element.active  = false;
        } )
    }

    startApp(){
        
        cc.log("start gMap");

        this.node.children.forEach( (element)=>{
            element.active  = true;
        } )

        let action = cc.spawn(
            cc.scaleTo(0.3, 1).easing(cc.easeCubicActionOut()),
            cc.fadeTo(0.3,255).easing(cc.easeCubicActionIn()),
        );
        this.node.runAction(action);
        //cache this to GameInfo
        Define.GameInfo.Inst.curApp = this;
    }

    endApp(){
        cc.log("end gMap");
        
        let action = cc.sequence(
            cc.spawn(
                cc.scaleTo(0.1, 0).easing(cc.easeCubicActionOut()),
                cc.fadeTo(0.1,0).easing(cc.easeCubicActionIn()),
            ),
            cc.callFunc(()=>(
                this.node.children.forEach( (element)=>{
                    element.active  = false;
                } )
            ))
        )
        
        this.node.runAction(action);

        Define.GameInfo.Inst.curApp = undefined;
    }
}
