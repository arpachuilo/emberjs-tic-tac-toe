import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// Markers, N = empty
const X = 'X';
const O = 'O';
const N = '';

export default class IndexController extends Controller {
  // query mnk
  @tracked m = 3;
  @tracked n = 3;
  @tracked k = 3;

  // model mnk
  @tracked M = 3;
  @tracked N = 3;
  @tracked K = 3;

  @tracked cells = [[]];

  @tracked current;
  @tracked player;
  @tracked computer;

  @tracked gameOver = '';
  @tracked status = '';

  /**
   * Get unoccupied cells as flat array of [i, j]
   */
  get unoccupiedCells() {
    return this.cells
      .map((row, i) => {
        return row.map((value, j) => {
          return [i, j, value];
        });
      })
      .flat()
      .filter(([, , value]) => !value);
  }

  @action
  updateCell(ii, jj, marker) {
    this.cells = this.cells.map((row, i) => {
      return row.map((value, j) => {
        if (ii === i && jj === j) return marker;
        return value;
      });
    });
  }

  /**
   * Pass turn over (if not skipped)
   *
   * Update game progress
   * Set status
   * Simulate computers turn (if game not over and their turn)
   */
  @action
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
    if (this.unoccupiedCells.length === 0) return 'Cat';

    return '';
  }

  /**
   * Check for winner by moving in requested direction.
   * Check if neighbor matches expected marker and increment.
   * Found winner if count is equal is expected k value.
   */
  checkForWinner(current, offset, expected, count = 1) {
    // found winner, return
    if (count === this.K) return expected;

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

  get cellsWithNeighbors() {
    return this.cells
      .map((row, i) => {
        return row.map((value, j) => {
          return [i, j, value];
        });
      })
      .flat()
      .filter(([i, j, value]) => {
        if (value) return false;
        for (let n = 0; n < this.offsets.length; n++) {
          const [di, dj] = this.offsets[n];
          const [ni, nj] = [i + di, j + dj];

          // check for invalid indexing
          if (ni < 0 || ni >= this.cells.length) continue;
          if (nj < 0 || nj >= this.cells[ni].length) continue;
          if (this.cells[ni][nj]) return true;
        }

        return false;
      });
  }

  /**
   * Have computer, make a move.
   * Currently will just place at some random unoccupied cell.
   */
  computerTurn(latency = 600) {
    // every cell taken
    const unoccupiedCells = this.unoccupiedCells;
    if (unoccupiedCells.length === 0) return;

    // simulate some API like response with timeout
    this.computerBusy = setTimeout(() => {
      // pick random unoccupied cell
      let randomIndex = Math.floor(Math.random() * unoccupiedCells.length);
      let [ri, rj] = unoccupiedCells[randomIndex];

      // some cell has neighbor
      if (unoccupiedCells.length !== this.M * this.N) {
        const cellsWithNeighbors = this.cellsWithNeighbors;
        randomIndex = Math.floor(Math.random() * cellsWithNeighbors.length);
        [ri, rj] = cellsWithNeighbors[randomIndex];
      }

      this.updateCell(ri, rj, this.computer);

      this.update();
    }, latency);
  }
}
