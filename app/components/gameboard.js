import Component from '@glimmer/component';
import { action } from '@ember/object';

// Markers, N = empty
const X = 'X';
const O = 'O';

/**
 * Gameboard logic for tic-tac-toe.
 * Play against an AI that moves randomly.
 */
export default class GameboardComponent extends Component {
  get cells() {
    return this.args.cells;
  }

  get status() {
    return this.args.status;
  }

  get gameOver() {
    return this.args.gameOver;
  }

  get player() {
    return this.args.player;
  }

  get computer() {
    return this.args.computer;
  }

  /**
   * Attempt to place player marker requested cell
   */
  @action placeMarker(i, j) {
    if (this.args.current != this.args.player) return;

    // update cell at i,j
    this.args.updateCell(i, j, this.args.player);
    this.args.update();
  }

  /**
   * Check if cell should be disabled
   */
  cellDisabled = (cell) => {
    if (this.args.gameOver) return true;
    if (this.args.current != this.args.player) return true;
    if (cell !== '') return true;
    return false;
  };

  /**
   * Get icon associated with marker
   */
  cellIcon = (cell) => {
    if (cell === X) return 'close';
    if (cell === O) return 'circle';
    return '';
  };

  get cellStyle() {
    return `width: calc(100%/${this.args.M}); height: calc(100%/${this.args.N})`;
  }

  get markerStyle() {
    return `font-size: min(100vw / ${this.args.M} - 1em, 100vh / ${this.args.N} - 1em`;
  }

  /**
   * Reset board
   */
  @action
  reset() {
    // could reinit fields, but this is simple enough for now
    location.reload();
  }
}
