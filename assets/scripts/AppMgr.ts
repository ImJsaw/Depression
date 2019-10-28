import App from "./components/App";
import * as Define from "./Define";

const { ccclass, property } = cc._decorator;


@ccclass("singleSymbolSetting")
class SymbolSetting{
    @property(cc.Integer)
    symbolID : number = 1;

}

@ccclass
export default class AppMgr extends cc.Component {

    @property ( [SymbolSetting] )
    AppList : SymbolSetting[] = [];

    @property(App)
    Apps : App = null;

    @property(cc.Node)
    app : cc.Node = null;


    startApp( appNum : Define.Apps){
    }

}
