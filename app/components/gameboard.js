import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// Markers, N = empty
const X = 'X';
const O = 'O';
const N = '';

/**
 * Gameboard logic for tic-tac-toe.
 * Play against an AI that moves randomly.
 */
export default class GameboardComponent extends Component {
  constructor(...args) {
    super(...args);

    // assign player/computer X or O randomly
    [this.player, this.computer] = Math.random() < 0.5 ? [X, O] : [O, X];

    // whose turn it is currently
    // X goes first
    this.current = X;

    // do not pass during update
    this.update(false);
  }

  @tracked cells = [
    [N, N, N],
    [N, N, N],
    [N, N, N],
  ];
  @tracked gameOver = '';
  @tracked status = '';

  /**
   * Attempt to place player marker requested cell
   */
  @action placeMarker(ei, ej) {
    if (this.current != this.player) return;

    // update cell at i,j
    this.cells = this.cells.map((row, i) => {
      return row.map((value, j) => {
        if (ei === i && ej === j) return this.player;
        return value;
      });
    });

    this.update();
  }

  /**
   * Get unoccupied cells as flat array of [i, j]
   */
  unoccupiedCells() {
    return this.cells
      .map((row, i) => {
        return row.map((value, j) => {
          return [i, j, value];
        });
      })
      .flat()
      .filter(([, , value]) => !value);
  }

  /**
   * Check if cell should be disabled
   */
  cellDisabled = (cell) => {
    if (this.gameOver) return true;
    if (this.current != this.player) return true;
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

  /**
   * Pass turn over (if not skipped)
   *
   * Update game progress
   * Set status
   * Simulate computers turn (if game not over and their turn)
   */
  update(pass = true) {
    if (pass) this.passTurn();

    this.gameOver = this.getGameProgress();
    if (this.gameOver !== '') {
      this.status = '';
    } else if (this.current === this.player) {
      this.status = "It's your turn!";
    } else if (this.current === this.computer) {
      this.status = 'Waiting for your opponent to make their move . . .';
    } else {
      this.status = '';
    }

    document.title = this.status;

    // game no longer in progress
    if (this.gameOver !== '') {
      return;
    }

    // game not over, hand over to computer
    if (this.current === this.computer) this.computerTurn();
  }

  /**
   * Reset board
   */
  @action
  reset() {
    // could reinit fields, but this is simple enough for now
    location.reload();
  }

  // offsets to adjacent neighbors
  offsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  /**
   * Get game progress
   * Empty string is still in progress
   */
  getGameProgress() {
    // check for game winner
    // written to work for n,m,k games
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const cell = this.cells[i][j];

        // skip if empty
        if (cell === N) continue;

        // check neighbors
        for (let n = 0; n < this.offsets.length; n++) {
          const offset = this.offsets[n];
          const winner = this.checkForWinner([i, j], offset, cell);
          if (winner != null) {
            if (winner === this.player) return 'You Win!';
            else return 'You Lost :(';
          }
        }
      }
    }

    // all cells occupied, game is over
    if (this.unoccupiedCells().length === 0) return 'Cat';

    return '';
  }

  /**
   * Check for winner by moving in requested direction.
   * Check if neighbor matches expected marker and increment.
   * Found winner if count is equal is expected k value.
   */
  checkForWinner(current, offset, expected, count = 1, k = 3) {
    // found winner, return
    if (count === k) return expected;

    const [i, j] = current;
    const [di, dj] = offset;
    const [ni, nj] = [i + di, j + dj];

    // check for invalid indexing
    if (ni < 0 || ni >= this.cells.length) return null;
    if (nj < 0 || nj >= this.cells[ni].length) return null;

    const neighbor = this.cells[ni][nj];
    if (neighbor === expected) {
      return this.checkForWinner([ni, nj], offset, expected, count + 1);
    }

    return null;
  }

  // swap current expected marker
  passTurn() {
    this.current = this.current === X ? O : X;
  }

  /**
   * Have computer, make a move.
   * Currently will just place at some random unoccupied cell.
   */
  computerTurn(latency = 600) {
    // every cell taken
    const unoccupiedCells = this.unoccupiedCells();
    if (unoccupiedCells.length === 0) return;

    // simulate some API like response with timeout
    setTimeout(() => {
      // pick random unoccupied cell
      const randomIndex = Math.floor(Math.random() * unoccupiedCells.length);
      const [ri, rj] = unoccupiedCells[randomIndex];
      this.cells = this.cells.map((row, i) => {
        return row.map((value, j) => {
          if (ri === i && rj === j) return this.computer;
          return value;
        });
      });

      this.update();
    }, latency);
  }
}
