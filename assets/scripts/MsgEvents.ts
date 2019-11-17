const {ccclass} = cc._decorator;

@ccclass
export default class MsgEvents extends cc.Component {
    example() {
        window['stopScript']()
        cc.log("adfs")
    }
}