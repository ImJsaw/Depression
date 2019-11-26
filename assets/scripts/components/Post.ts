import Game from "../Game";

const { ccclass, property } = cc._decorator;

/**提示視窗物件 */
@ccclass
export default class Post extends cc.Component {

    /**貼文圖片 */
    @property(cc.Sprite)
    headIcon : cc.Sprite = null;

    /**發文ID */
    @property(cc.Label)
    accountID : cc.Label = null;

    /**貼文圖片 */
    @property(cc.Sprite)
    img : cc.Sprite = null;

    /**貼文內容 */
    @property(cc.Label)
    postTxt : cc.Label = null;

    /**兩貼文之間距離 */
    private postInterval : number = -600;
    
    onLoad() {

    }

    /**
     * 產生文章
     * @param headIconName 頭貼檔案名稱
     * @param id 發文ID
     * @param imgName 圖片檔案名稱
     * @param txt 內文
     * @param index 第幾篇文章(上往下)
     * @param offset 平移距離(default=0)
     */
    init( headIconName : string, id : string, imgName : string, txt : string , index : number, offset : number = 0){
        this.headIcon.spriteFrame = Game.Inst.resourcesMgr.load(headIconName);
        this.accountID.string = id;
        this.img.spriteFrame = Game.Inst.resourcesMgr.load(imgName);
        this.postTxt.string = txt;
        this.node.y = this.postInterval*index + offset;
    }


}
