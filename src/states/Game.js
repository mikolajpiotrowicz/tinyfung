/* globals __DEV__ */
import Phaser from 'phaser'
import Enemy from '../sprites/Enenmy'
import Mushroom from '../sprites/Mushroom'
export default class extends Phaser.State {
  init () {}
  preload () {}
  create () {
    this.game.world.setBounds(0, 0, this.game.width , this.game.height );
    const bannerText = 'Mały grzybek'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
      font: '40px Bangers',
      fill: '#77BFA3',
      smoothed: false
    });
    this.map = this.game.add.tilemap('map');
    this.map.addTilesetImage('ground_1x1');
    this.map.addTilesetImage('walls_1x2');
    this.map.addTilesetImage('tiles2');

      this.layer = this.map.createLayer('Tile Layer 1');
      this.layer.resizeWorld();
      this.map.setCollisionBetween(1, 12);
      this.game.physics.p2.convertTilemap(this.map, this.layer);


    banner.padding.set(10, 16)
    banner.anchor.setTo(0.5)

    this.mushroom = new Mushroom({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    });

   this.shites = [];
    // for(let i = 0; i < 100; i++){
    //   this.shites[i] = new Mushroom({
    //       game: this.game,
    //       x: Math.random() * this.game.width * 10,
    //       y: this.game.height +  Math.random() * this.game.height,
    //       asset: 'enemy',
    //       ignore: true
    //   });
    //   this.game.add.existing(this.shites[i]);
    //   this.game.physics.p2.enable(this.shites[i]);
    //   this.shites[i].body.fixedRotation = true;
    //   this.shites[i].body.data.mass = 1;
    // }
    this.enemy = [];
    this.game.physics.p2.enable(this.mushroom);
    this.game.add.existing(this.mushroom);
    this.game.physics.p2.world.defaultContactMaterial.friction = 0.9;
    this.game.physics.p2.world.setGlobalStiffness(1e5);
    this.game.physics.p2.gravity.y = 1750;
    this.mushroom.body.fixedRotation = true;
    this.game.camera.follow(this.mushroom);
    this.mushroom.body.damping = 0.5
  }

  render () {
  }
}
