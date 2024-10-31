import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'tic-tac-toe/tests/helpers';

module('Acceptance | tic tac toe', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');
    assert.strictEqual(currentURL(), '/');

    assert.dom('#gameboard').exists();
    assert.dom('#about-nav').hasText('About');
    await click('#about-nav');
    assert.strictEqual(currentURL(), '/about');
  });

  test('visiting /about', async function (assert) {
    await visit('/about');
    assert.strictEqual(currentURL(), '/about');

    assert.dom('#about').exists();
    assert.dom('#newgame-nav').hasText('New Game');
    await click('#newgame-nav');
    assert.strictEqual(currentURL(), '/');
  });

  test('navigating user nav-bar', async function (assert) {
    await visit('/');
    assert.strictEqual(currentURL(), '/');

    assert.dom('nav').exists();
    assert.dom('#newgame-nav').hasText('New Game');
    assert.dom('#about-nav').hasText('About');

    await click('#about-nav');
    assert.strictEqual(currentURL(), '/about');

    await click('#newgame-nav');
    assert.strictEqual(currentURL(), '/');
  });
});
