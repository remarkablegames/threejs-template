import { createEngine, createScene } from './core';
import { Game } from './game';

const canvas = document.querySelector('canvas');

if (!canvas) {
  throw new Error('Game canvas not found');
}

const engine = createEngine(canvas);
const scene = createScene(engine);
const game = new Game(engine, scene);

game.start();

// Hide spinner when scene is ready
scene.onReadyObservable.addOnce(() => {
  document.getElementById('spinner')?.remove();
});

// Enable inspector only in development (excluded from production build)
if (import.meta.env.DEV) {
  void import('@babylonjs/inspector').then(({ ShowInspector }) => {
    ShowInspector(scene, {});
  });
}

// Pause when tab is hidden
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    game.pause();
  } else {
    game.resume();
  }
});
