create(); {
this.courseKeys = this.InputDeviceInfo.keyboard.createCursorKeys();//للكيبورد


var KeyW = scene.input.Keyboard.addKey("w");
var KeyD = scene.input.Keyboard.addKey("D");
var KeyA = scene.input.Keyboard.addKey("A");
var KeyS = scene.input.Keyboard.addKey("S");
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
