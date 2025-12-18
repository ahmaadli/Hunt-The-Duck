window.onload = function() {
    var config = {
        width: 900,
        height: 600,
        type: Phaser.AUTO,
        transparent: true,
        backgroundColor: '#ff0000ff',
        scene: [FirstScene]
    }
    var HuntTheDuck = new Phaser.Game(config);
}

create(); {
this.courseKeys = this.InputDeviceInfo.keyboard.createCursorKeys();//للكيبورد


var KeyW = scene.input.Keyboard.addKey("w");
var KeyW = scene.input.Keyboard.addKey("D");
var KeyW = scene.input.Keyboard.addKey("A");
var KeyW = scene.input.Keyboard.addKey("S");

}







update(); {
var pointer =this.InputDeviceInfo.activePointer;
if(pointer.isDown){ //للماوس
var touchX = pointer.x;
var touchY = pointer.y;
}
this.courseKeys = this.InputDeviceInfo.keyboard.createCursorKeys();
var isUPDown = cursorKeys.up.isDown;//ازرار الاسهم
var isDownDown = cursorKeys.down.isDown;
var isLeftDown = cursorKeys.left.isDown;
var isRightDown = cursorKeys.right.isDown;
var isSpaceDown = cursorKeys.space.isDown;
var isShiftDown = cursorKeys.shift.isDown;
var isDown = KeyW.isDown;
var isUp = KeyW.isUp;

}