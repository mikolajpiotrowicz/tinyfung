import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])
    this.load.setPreloadSprite(this.loaderBar)
    this.load.image('mushroom', 'assets/images/mushroom2.png');
    this.load.image('enemy', 'assets/images/mushroom1.png');
    this.load.image('electron', 'assets/images/dot.png');
    this.load.tilemap('map', 'assets/maps/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('ground_1x1', 'assets/images/ground_1x1.png');
    this.load.image('walls_1x2', 'assets/images/walls_1x2.png');
    this.load.image('tiles2', 'assets/images/tiles2.png');
  }

  create () {
    this.state.start('Game')
  }
}
