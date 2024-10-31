import { module, test } from 'qunit';
import { setupRenderingTest } from 'tic-tac-toe/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | gameboard/cell', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders disabled', async function (assert) {
    this.set('noop', () => {});
    this.set('disabled', true);
    await render(hbs`
      <Gameboard::Cell @disabled={{this.disabled}} @onClick={{this.noop}} />
    `);

    assert.dom('.cell button').hasAttribute('disabled', '');
  });

  test('it renders enabled', async function (assert) {
    this.set('noop', () => {});
    this.set('disabled', false);
    await render(hbs`
      <Gameboard::Cell @disabled="false" @onClick={{this.noop}} />
    `);

    assert.dom('.cell button').hasAttribute('disabled');
  });

  test('it renders with icon', async function (assert) {
    this.set('noop', () => {});
    this.set('disabled', false);
    await render(hbs`
      <Gameboard::Cell @icon="circle" @disabled={{this.disabled}} @onClick={{this.noop}} />
    `);

    assert.dom('.cell button i').hasText('circle');
  });
});
