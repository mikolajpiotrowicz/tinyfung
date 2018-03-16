import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'

import config from './config'

class Game extends Phaser.Game {
  constructor () {
    const width = document.body.clientWidth ? document.body.clientWidth  : config.gameWidth;
    const height = document.body.clientHeight ? document.body.clientHeight : config.gameHeight;
    console.log(width, height);
    super(width, height, Phaser.CANVAS, 'content', null);
    //this.world.setBounds(0, 0, width * 2, height * 2);
    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Game', GameState, false);
    this.frame = 0;
    //this.physics.startSystem(Phaser.physics.Box2D);
    if (!window.cordova) {
      this.state.start('Boot')
    }


  }

  updareFrame(){
    this.frame++;
  }
}

window.game = new Game()

if (window.cordova) {
  var app = {
    initialize: function () {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false
      )
    },

    onDeviceReady: function () {
      this.receivedEvent('deviceready')
      window.game.state.start('Boot')
    },

    receivedEvent: function (id) {
      console.log('Received Event: ' + id)
    }
  }

  app.initialize()
}
