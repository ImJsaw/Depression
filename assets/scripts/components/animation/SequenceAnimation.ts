import AnimationBase from "./AnimationBase";
import Game from "../../Game";

const {ccclass, property, requireComponent} = cc._decorator;

/**
 * 逐格動畫
 */
@ccclass
@requireComponent(cc.Animation)
@requireComponent(cc.Sprite)
export default class SequenceAnimation extends AnimationBase {

    /**動畫擺放資料夾路徑。
     * 路徑Root：resources/animations/
     */
    @property(String)
    pathName: string = "Sequence"

    /**動畫(資料夾)名稱 */
    @property(cc.String)
    clip_name: string = "";
    
    @property(cc.Animation)
    private animator: cc.Animation = null;

    onLoad () 
    {         
        super.onLoad();
        this.animator = this.getComponent(cc.Animation);
        if(!cc.isValid(this.node.getComponent(cc.Sprite)))
            this.node.addComponent(cc.Sprite);
    }
    
    play(speed: number=1.0, loop: boolean = false,onfinished?) 
    {
        Game.Inst.resourcesMgr.loadSequenceAnumation(this.animator,this.pathName,this.clip_name,speed,loop);

        if(this.onFinish != undefined){
            this.animator.off("finished", this.onFinish);
            this.onFinish = null;
        }

        if (onfinished != undefined) {
            this.onFinish = onfinished;
            this.animator.on("finished", this.onFinish);
        }
    }

    pause() 
    {
        this.animator.pause(this.clip_name);
    }

    stop() 
    {
        if(this.onFinish != undefined){
            this.animator.off("finished", this.onFinish);
            this.onFinish = null;
        }

        this.animator.stop();
    }

    resume()
    {
        this.animator.resume(this.clip_name);
    }
}
