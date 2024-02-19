import Phaser from "phaser";
import Scene from "./scenes/scene";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Scene]
};

export default new Phaser.Game(config);
