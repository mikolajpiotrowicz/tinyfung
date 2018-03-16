import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor ({ game, x, y, asset }) {
        console.log({ game, x, y, asset })
        super(game, x, y, asset)
        this.anchor.setTo(0.5);
        this.game.add.existing(this);
        this.game.physics.p2.enable(this);
    }
    update () {
        this.body.setZeroVelocity();
    }
}
