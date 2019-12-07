import Game from "../Game";
import * as Define from "../Define";
import instagram from "./app/instagram";

const { ccclass, property } = cc._decorator;

/**ig profile */
@ccclass
export default class IGSearch extends cc.Component {

    @property(cc.Node)
    searchRoot : cc.Node = null;
    
    onClick(){
        //TODO
    }
}
