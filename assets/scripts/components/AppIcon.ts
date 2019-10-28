import App from "./App";
import * as Define from "../Define";

const {ccclass, property} = cc._decorator;


@ccclass
export default class AppIcon extends cc.Component {
    
    @property({type:cc.Enum(Define.Apps),serializable:true})
    app : Define.Apps = Define.Apps.Map;

    enterApp(){
        
        this.app.startApp();
    }
}
