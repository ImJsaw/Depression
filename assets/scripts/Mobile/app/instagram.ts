import * as Define from "../../Define";
import App from "./App";
import IGProfile from "../../components/IGProfile";

const {ccclass, property} = cc._decorator;


@ccclass
export default class instagram extends App {

    /**animation duration */
    private duration : number = 1;

    private offSet : number = 0;
    private maxOffSet : number = 2743;

    @property(cc.Node)
    postRoot : cc.Node = null;

    @property(cc.Node)
    profileRoot : cc.Node = null;

    @property(cc.Node)
    searchRoot : cc.Node = null;

    onLoad(){
        this.node.scale = 0;
        this.node.opacity = 0;
        this.node.children.forEach( (element)=>{
            element.active  = false;
        } )
    }

    startApp(){
        //start anime
        cc.log("start IG");
        this.node.children.forEach( (element)=>element.active = true);
        let action = cc.spawn(
            cc.scaleTo(0.3, 1).easing(cc.easeCubicActionOut()),
            cc.fadeTo(0.3,255).easing(cc.easeCubicActionIn()),
        );
        this.node.runAction(action);

        this.renewPost();
        
    }


    renewPost(){
        //TODO:
    }

    openProfile(account : Define.IGAccount){
        this.postRoot.active = false;
        this.searchRoot.active = false;
        this.profileRoot.active = true;

        this.profileRoot.children.forEach((element)=>{
            if(element.getComponent(IGProfile).getAccount() == account){
                element.active = true;
            }
            else 
                element.active = false;
        })
    }

    openSearch(){
        this.postRoot.active = false;
        this.profileRoot.active = false;
        this.searchRoot.active = true;
    }

    endApp(){
        this.postRoot.off(cc.Node.EventType.TOUCH_MOVE);
        cc.log("end IG");
    }
}
