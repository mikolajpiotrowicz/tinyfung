import Phaser from 'phaser'
import Electron from './Electron'

export default class extends Phaser.Sprite {
    constructor({game, x, y, asset, ignore}) {
        super(game, x, y, asset);
        this.ignore = ignore;
        this.anchor.setTo(0.5);
        this.acceleration = 4;
        this.acc = 300;
        this.haveElectron = false;
        this.game.input.mouse.mouseWheelCallback = this.mouseWheel;
        this.mouseWheel = this.mouseWheel.bind(this);
    }

    mouseWheel() {
        if (this.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP) {
            this.state.states.Game.mushroom.acc += 30;
        } else {
            this.state.states.Game.mushroom.acc -= 30;
        }
    }

    spawnElectron() {
        if(!this.haveElectron){
            this.electron = new Electron({
                game: this.game,
                x: this.body.x + 100,
                y: this.body.y,
                asset: 'electron'
            });
            this.electron.scale = {x: 0.1 , y: 0.1};
            this.electron.body.setRectangle(this.electron.width, this.electron.height);
            this.electron.body.applyImpulse([100,100]);
            this.haveElectron = true;
            this.electron.body.setCllo
        }
        console.log(this.electron.body);
        if (this.electron) this.electron.body.applyImpulse([-80,0]);
    }

    steering() {
        if (this.ignore) {
            this.body.setZeroVelocity();
            return;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.body.moveLeft(this.acc);
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.body.moveRight(this.acc);
        }
        if (this.game.input.keyboard.isDown((Phaser.Keyboard.UP)) && this.checkIfCanJump()) {
            this.body.moveUp(this.acc * 3);

        }
        if (this.game.input.keyboard.isDown((Phaser.Keyboard.DOWN))) {
            this.body.moveDown(this.acc);
            this.spawnElectron();
        }
    }

    checkIfCanJump() {

        var result = false;
        var yAxis = p2.vec2.fromValues(0, 1);
        for (var i = 0; i < this.game.physics.p2.world.narrowphase.contactEquations.length; i++) {
            let c = this.game.physics.p2.world.narrowphase.contactEquations[i];
            if (c.bodyA === this.body.data || c.bodyB === this.body.data) {
                let d = p2.vec2.dot(c.normalA, yAxis);
                if (c.bodyA === this.body.data) {
                    d *= -1;
                }
                if (d > 0.5) {
                    result = true;
                }
            }
        }
        return result;
    }

    update() {
        this.steering();
    }
}
