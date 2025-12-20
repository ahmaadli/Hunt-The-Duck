class FirstScene extends Phaser.Scene {
class FirstScene extends Phaser.Scene {
    constructor() {
        super("FirstScene");
        this.score = 0;
        this.gameOver = false;
        this.initialTime = 30;
        this.timeLeft = this.initialTime;
    }

    preload() {
        // --- تحميل الصور والملفات ---
        this.load.image("background", "Background.png");
        this.load.image("crosshair", "crosshair.png");
        this.load.spritesheet("animDuck", "animationDuck.png", { frameWidth: 280, frameHeight: 200 });
        this.load.audio("shootSound", "shootSound.mp3");
        this.load.audio("DuckQuack", "duckQuack.mp3");
    }

    create() {
        // 1. الخلفية
        this.add.image(0, 0, "background").setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height);

        // 2. إعداد الأنميشن
        if (!this.anims.exists("fly")) {
            this.anims.create({
                key: "fly",
                frames: this.anims.generateFrameNumbers("animDuck", { start: 0, end: 3 }),
                frameRate: 8,
                repeat: -1
            });
        }

        // 3. نصوص الواجهة
        this.scoreText = this.add.text(this.scale.width/2 - 100, 20, 'Score: 0', {
            fontSize: '32px', fill: '#000000ff', fontStyle: 'bold' 
        }).setOrigin(0.5, 0);
        this.timerText = this.add.text(this.scale.width / 2 + 100, 20, 'Time: ' + this.timeLeft, {
            fontSize: '32px', fill: '#000000ff', fontStyle: 'bold'
        }).setOrigin(0.5, 0);
        this.add.text(this.scale.width/2, 50, "Click on the duck to shoot it!", {
            font: "25px Arial", fill: "#000000" }).setOrigin(0.5, 0);
        // نص النهاية
        this.winText = this.add.text(this.scale.width / 2, this.scale.height / 2, "Game Over!", {
            fontSize: '80px', fill: '#ffffffff', fontWeight: 'bold', stroke: '#000000ff', strokeThickness: 6, fontFamily: 'Arial'
        }).setOrigin(0.5).setDepth(10).setVisible(false);

        this.gameTimer = this.time.addEvent({
            delay: 1000,
            callback: this.onTimerTick,
            callbackScope: this,
            repeat: this.initialTime - 1
        });

        // صوت البطة
        this.duckHitCooldown = false;

         this.duckSound = this.sound.add("DuckQuack", {
               volume: 0.5
         });



         // إعداد صوت البطة عند النقر
         this.playDuckHitSound = () => {
            if (this.duckHitCooldown) return;

             this.duckHitCooldown = true;
             this.duckSound.play();

             this.time.delayedCall(120, () => {
             this.duckHitCooldown = false;
              });
            };

        

        // 4. دالة إعداد النقر للبط العادي
        const setupDuck = (duck, pointsValue) => {
            duck.setInteractive();
            duck.isFalling = false;
            duck.on('pointerdown', () => {
                if (this.gameOver || duck.isFalling) return;
                
                // صوت البطة
                this.playDuckHitSound();

                this.score += pointsValue;
                this.scoreText.setText('Score: ' + this.score);

                // تأثير السقوط
                duck.isFalling = true;
                duck.stop();
                duck.setTint(0xFF0000);
                duck.setGravityY(900);
            });
        };

        // 5. انشاء المجموعات والبط
        this.duckGroup = this.physics.add.group();
        const numberOfDucks = 2;
        for (let i = 0; i < numberOfDucks; i++) {
            let startX = Phaser.Math.Between(-1000, -1);
            let startY = Phaser.Math.Between(50, 450);
            let duck = this.duckGroup.create(startX, startY, "animDuck");
            duck.setScale(0.5);
            duck.setOrigin(0, 0);
            duck.flipX = true;
            duck.currentSpeedX = 20;
            duck.play("fly", true);
            setupDuck(duck, 10);
        }

        this.duckGroup2 = this.physics.add.group();
        const numberOfDucks2 = 2;
        for (let i = 0; i < numberOfDucks2; i++) {
            let startX = Phaser.Math.Between(1000, 1);
            let startY = Phaser.Math.Between(50, 450);
            let duck = this.duckGroup2.create(startX, startY, "animDuck");
            duck.setScale(0.5);
            duck.setOrigin(0, 0);
            duck.flipX = false;
            duck.currentSpeedX = -20;
            duck.play("fly", true);
            setupDuck(duck, 10);
        }

        // البط سيء الحظ
        this.badLuckGroup = this.physics.add.group();
        const numberOfBLG = 3;
        for (let i = 0; i < numberOfBLG; i++) {
            let startX = Phaser.Math.Between(1000, 1);
            let startY = Phaser.Math.Between(50, 450);
            let duck = this.badLuckGroup.create(startX, startY, "animDuck");
            duck.setTint(0x808080);
            duck.setScale(0.5);
            duck.setOrigin(0, 0);
            duck.flipX = false;
            duck.currentSpeedX = -20;
            duck.play("fly", true);
            setupDuck(duck, -10);
        }
        // الكروس هير
        this.crosshair = this.physics.add.sprite(400, 300, "crosshair").setScale(0.6).setOrigin(0.5, 0.5);

        // اخفاء الماوس
        this.input.setDefaultCursor('none');

        // صوت الطلقة
        this.shootSound = this.sound.add("shootSound", { volume: 0.5 } ); 

        // عند النقر تشغيل صوت الطلقة
        this.input.on('pointerdown', () => {
            if (!this.gameOver) {
            this.shootSound.play();
        }});
    }

    onTimerTick() {
        this.timeLeft--;
        this.timerText.setText('Time: ' + this.timeLeft);
        
        if (this.timeLeft <= 0) {
            this.endGame();
        }
    }

    endGame() {
        this.gameOver = true;
        this.winText.setVisible(true);
        this.input.setDefaultCursor('default');

        if (this.gameTimer) this.gameTimer.remove(false);
        if (this.duckGroup) this.duckGroup.children.iterate(d => d.stop());
        if (this.duckGroup2) this.duckGroup2.children.iterate(d => d.stop());
        if (this.badLuckGroup) this.badLuckGroup.children.iterate(d => d.stop());

        this.tweens.add({
            targets: this.winText,
            scale: 1.2,
            duration: 500,
            yoyo: true,
            repeat: -1
        });
    }

    update() {
        if (this.gameOver) return;

        // تحريك الماوس (الكروس هير)
        this.crosshair.x = this.input.activePointer.worldX;
        this.crosshair.y = this.input.activePointer.worldY;
       
        // حركة البطة العادية 1
        if (this.duckGroup) {
            this.duckGroup.children.iterate((duckSprite) => {
                duckSprite.x += duckSprite.currentSpeedX;
                if (duckSprite.isFalling) {
                    duckSprite.currentSpeedX *= 0.99;
                    if (duckSprite.y > this.scale.height + 200) {
                        duckSprite.isFalling = false;
                        duckSprite.setGravityY(0);
                        duckSprite.setVelocity(0, 0);
                        duckSprite.clearTint();
                        duckSprite.currentSpeedX = 14;
                        duckSprite.x = -150;
                        duckSprite.y = Phaser.Math.Between(50, 450);
                        duckSprite.play("fly", true);
                    }
                } else {
                    if (duckSprite.x > this.scale.width + 150) {
                        duckSprite.x = -150;
                        duckSprite.y = Phaser.Math.Between(50, 450);
                    }
                }
            });
        }
       
        // حركة البطة العادية 2
        if (this.duckGroup2) {
            this.duckGroup2.children.iterate((duckSprite) => {
                duckSprite.x += duckSprite.currentSpeedX;
                 if (duckSprite.isFalling) {
                    duckSprite.currentSpeedX *= 0.99;
                    if (duckSprite.y > this.scale.height + 200) {
                        duckSprite.isFalling = false;
                        duckSprite.setGravityY(0);
                        duckSprite.setVelocity(0, 0);
                        duckSprite.clearTint();
                        duckSprite.currentSpeedX = -14;
                        duckSprite.x = this.scale.width + 150;
                        duckSprite.y = Phaser.Math.Between(50, 450);
                        duckSprite.play("fly", true);
                    }
                } else {
                    if (duckSprite.x < -150) {
                        duckSprite.x = this.scale.width + 150;
                        duckSprite.y = Phaser.Math.Between(50, 450);
                    }
                }
            });
        }

        if (this.badLuckGroup) {
            this.badLuckGroup.children.iterate((duckSprite) => {
                duckSprite.x += duckSprite.currentSpeedX;
                 if (duckSprite.isFalling) {
                    duckSprite.currentSpeedX *= 0.99;
                    if (duckSprite.y > this.scale.height + 200) {
                        duckSprite.isFalling = false;
                        duckSprite.setGravityY(0);
                        duckSprite.setVelocity(0, 0);
                        duckSprite.clearTint();
                        duckSprite.setTint(0x808080);
                        duckSprite.currentSpeedX = -14;
                        duckSprite.x = this.scale.width + 150;
                        duckSprite.y = Phaser.Math.Between(50, 450);
                        duckSprite.play("fly", true);
                    }
                } else {
                    if (duckSprite.x < -150) {
                        duckSprite.x = this.scale.width + 150;
                        duckSprite.y = Phaser.Math.Between(50, 450);
                    }
                }
            });
        }
    }
}


