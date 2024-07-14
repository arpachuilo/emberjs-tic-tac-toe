import { module, test } from 'qunit';
import { setupRenderingTest } from 'tic-tac-toe/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | gameboard', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Gameboard />`);

    assert.dom('#gameboard').exists();
  });

  test('it renders dialog with message', async function (assert) {
    await render(hbs`<Gameboard
      @gameOver="You Win!"
      />`);

    assert.dom('dialog').exists();
    assert.dom('dialog').hasText('You Win! Play Again');
  });
});
