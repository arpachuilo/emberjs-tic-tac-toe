import { module, test } from 'qunit';
import { setupRenderingTest } from 'tic-tac-toe/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | gameboard/status', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with requested status', async function (assert) {
    await render(hbs`
      <Gameboard::Status @status="Hello World" />
    `);

    assert.dom('#status').hasText('Hello World');
  });
});
