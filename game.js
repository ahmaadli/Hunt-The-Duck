window.onload = function() {
    var config = {
        width: 1520,
        height: 720,
        type: Phaser.AUTO,
        scene: [FirstScene],
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        }
    }
    var HuntTheDuck = new Phaser.Game(config);
}
