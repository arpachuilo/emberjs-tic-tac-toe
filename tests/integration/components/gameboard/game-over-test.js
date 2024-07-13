import { module, test } from 'qunit';
import { setupRenderingTest } from 'tic-tac-toe/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | gameboard/game-over', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with game over message', async function (assert) {
    this.set('noop', () => {});

    await render(hbs`
      <Gameboard::GameOver @gameOver="You Win!" @reset={{this.noop}} />
    `);

    assert.dom().hasText('You Win! Play Again');
  });
});
