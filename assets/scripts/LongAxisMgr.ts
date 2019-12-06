
const {ccclass, property} = cc._decorator;

@ccclass
export default class LongAxis extends cc.Component {
	private windowSize = {width: 1920, height: 1080};
	private mousePosition = {x: 0, y: 0};
	
	@property(cc.Node)
    KTV: cc.Node = null;
    
    @property(Number)
    moveSpeed : number = 1;

    /**離邊界多少開始移動 */
    @property(Number)
    range : number = 200;
	
    onLoad (){
        // add key down and key up event
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
		this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
		
		this.windowSize = cc.view.getVisibleSize();
    }

    onDestroy(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
	
    start () {

    }

    // update (dt) {}

    onKeyDown(event){
        switch(event.keyCode) {
            case cc.macro.KEY.left:
                console.log('Press <left>');
                this.node.x+=5;
                //this.node.children.forEach(element=>element.x += 10);
                break;
            case cc.macro.KEY.right:
                console.log('Press <right>');
                this.node.x -= 5;
                //this.node.children.forEach(element=>element.x -= 10);
                break;
    
                
        }
    }

    onKeyUp(event){
        switch(event.keyCode) {
            case cc.macro.KEY.left:
                console.log('<left> Release');
                break;
            case cc.macro.KEY.right:
                console.log('<right> Release');
                break;
    
        }
    }
	
	onMouseMove(event) {
        this.mousePosition = this.node.convertToNodeSpaceAR(event.getLocation());
	}
	
	scrollByMousePosition() {
		//const range = 150; // Scroll when the length from the mouse position to canvas edge is less than
		//const moveSpeed = 1; // How much px should move per update
		const widest = this.KTV.getChildByName('Background').width;
		//const widest = this.KTV.width;
		
		// Now it move linearly, I wander use logarithmic function
		
		if (this.node.opacity) {
			if (this.mousePosition.x < - this.node.width / 2 + this.range) {
				if (this.KTV.x < (widest / 2 - this.node.width / 2)) {
					this.KTV.x += this.moveSpeed * (1 - (this.node.width / 2 + this.mousePosition.x)  / this.range);
				}
			} else if (this.mousePosition.x > this.node.width / 2 - this.range) {
				if (this.KTV.x > - (widest / 2 - this.node.width / 2)) {
					this.KTV.x -= this.moveSpeed * (1 - (this.node.width / 2 - this.mousePosition.x)  / this.range);
				}
			}
		}	
	}
	
	update(evt) {
		this.scrollByMousePosition()
    }
    
    disable(){
        this.enabled = false;
    }

    enable(){
        this.enabled = true;
    }
}
