window.onload = function() {
    var config = {
        width: 1500,
        height: 700,
        type: Phaser.AUTO,
        transparent: true,
        backgroundColor: '#ff0000ff',
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
