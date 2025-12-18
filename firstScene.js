class FirstScene extends Phaser.Scene {
    constructor() {
        super("FirstScene");
    }

    preload() {
        this.load.image("background", "Background.png");
        this.load.image("duck", "assets/duck.png");
        this.load.image("crosshair", "assets/crosshair.png");
    }//حقت الصور 

    create() {
        this.add.image(400, 300, "background").setScale(1.5);
        this.duck = this.physics.add.sprite(400, 300, "duck");
        this.add.text(10, 10, "Click on the duck to shoot it!", { font: "16px Arial", fill: "#000000ff" });
        this.crosshair = this.physics.add.sprite(400, 300, "crosshair").setScale(1.5);
        this.physics.world.setBoundsCollision(true);
    }//تحط لي الصور في الصفحه 

    update() {
        if (this.input.activePointer.isDown) {
            this.crosshair.setPosition(this.input.activePointer.x, this.input.activePointer.y);
            if (this.physics.overlap(this.crosshair, this.duck)) {
                console.log("Duck hit!");
            }
        }
    }//متى اتحرك من المشهد الاول الى
}

