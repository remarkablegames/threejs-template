import type { Engine } from '@babylonjs/core/Engines/engine';
import type { Scene } from '@babylonjs/core/scene';

/**
 * Orchestrates all game systems and manages the update loop.
 */
export class Game {
  private engine: Engine;
  private scene: Scene;

  constructor(engine: Engine, scene: Scene) {
    this.engine = engine;
    this.scene = scene;
  }

  /**
   * Start the game and begin the render loop
   */
  start() {
    this.engine.runRenderLoop(() => {
      this.scene.render();
      this.update();
    });
  }

  /**
   * Game update loop - called every frame
   */
  private update() {
    // Game logic updates go here
  }

  /**
   * Pause the game (stop render loop)
   */
  pause() {
    this.engine.stopRenderLoop();
  }

  /**
   * Resume the game (restart render loop)
   */
  resume() {
    this.engine.runRenderLoop(() => {
      this.scene.render();
      this.update();
    });
  }
}
