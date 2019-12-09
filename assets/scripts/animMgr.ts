import AnimationBase from "./components/animation/AnimationBase";

const { ccclass, property } = cc._decorator;

/**
 * 動畫管理物件
 */
@ccclass
export default class AnimMgr extends cc.Component {


    @property(cc.Node)
    mask : cc.Node = null;

    onLoad(){

    }

    playTransitionAnim(todo?){
        let duration : number = 5;

        this.mask.active = true;

        let action = cc.sequence(
            cc.fadeTo(0, 0),
            cc.fadeTo(duration, 255),
            cc.callFunc(()=>{
                cc.log("mid action");
                if(todo != undefined){
                    todo();
                }
            }),
            cc.fadeTo(duration, 0),
            cc.fadeTo(0, 0)
        );

        this.mask.runAction(action);
    }

}
