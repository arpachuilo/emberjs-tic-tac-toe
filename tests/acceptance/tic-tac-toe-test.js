import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'tic-tac-toe/tests/helpers';

module('Acceptance | tic tac toe', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');
    assert.strictEqual(currentURL(), '/');

    assert.dom('#gameboard').exists();
    assert.dom('nav > a.mdl-navigation__link:nth-child(2)').hasText('About');
    await click('nav > a.mdl-navigation__link:nth-child(2)');
    assert.strictEqual(currentURL(), '/about');
  });

  test('visiting /about', async function (assert) {
    await visit('/about');
    assert.strictEqual(currentURL(), '/about');

    assert.dom('#about').exists();
    assert.dom('nav > a.mdl-navigation__link:nth-child(1)').hasText('New Game');
    await click('nav > a.mdl-navigation__link:nth-child(1)');
    assert.strictEqual(currentURL(), '/');
  });

  test('navigating user nav-bar', async function (assert) {
    await visit('/');
    assert.strictEqual(currentURL(), '/');

    assert.dom('nav').exists();
    assert.dom('nav > a.mdl-navigation__link:nth-child(1)').hasText('New Game');
    assert.dom('nav > a.mdl-navigation__link:nth-child(2)').hasText('About');

    await click('nav > a.mdl-navigation__link:nth-child(2)');
    assert.strictEqual(currentURL(), '/about');

    await click('nav > a.mdl-navigation__link:nth-child(1)');
    assert.strictEqual(currentURL(), '/');
  });
});
