import { module, test } from 'qunit';
import { setupTest } from 'tic-tac-toe/tests/helpers';

module('Unit | Controller | index', function (hooks) {
  setupTest(hooks);

  test('can update cell', function (assert) {
    let controller = this.owner.lookup('controller:index');
    assert.ok(controller);

    controller.set('cells', [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);

    controller.updateCell(1, 1, 'x');
    assert.deepEqual(controller.cells[1][1], 'x');

    controller.updateCell(0, 0, 'o');
    assert.deepEqual(controller.cells[0][0], 'o');
  });

  test('can detect win', function (assert) {
    let controller = this.owner.lookup('controller:index');
    assert.ok(controller);

    controller.set('cells', [
      ['', 'X', ''],
      ['', 'X', ''],
      ['', 'X', ''],
    ]);
    controller.set('player', 'X');
    controller.update();

    assert.deepEqual(controller.gameOver, 'You Win!');
  });

  test('can detect lost', function (assert) {
    let controller = this.owner.lookup('controller:index');
    assert.ok(controller);

    controller.set('cells', [
      ['', 'X', ''],
      ['', 'X', ''],
      ['', 'X', ''],
    ]);
    controller.set('player', 'O');
    controller.update();

    assert.deepEqual(controller.gameOver, 'You Lost :(');
  });

  test('can detect cat', function (assert) {
    let controller = this.owner.lookup('controller:index');
    assert.ok(controller);

    controller.set('cells', [
      ['O', 'X', 'O'],
      ['O', 'O', 'X'],
      ['X', 'O', 'X'],
    ]);
    controller.set('player', 'X');
    controller.update();

    assert.deepEqual(controller.gameOver, 'Cat');
  });
});
