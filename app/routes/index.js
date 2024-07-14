import Route from '@ember/routing/route';

const X = 'X';
const O = 'O';
const N = '';

export default class IndexRoute extends Route {
  queryParams = {
    m: { refreshModel: true },
    n: { refreshModel: true },
    k: { refreshModel: true },
  };

  model(params) {
    return {
      M: parseInt(params.m),
      N: parseInt(params.n),
      K: parseInt(params.k),
    };
  }

  setupController(controller, model) {
    // set model mnk
    controller.set('M', model.M);
    controller.set('N', model.N);
    controller.set('K', model.K);

    // generate grid
    const cells = [];
    for (let i = 0; i < model.M; i++) {
      const row = [];
      for (let j = 0; j < model.N; j++) {
        row.push(N);
      }

      cells.push(row);
    }

    controller.set('cells', cells);

    // assign player/computer X or O randomly
    const [player, computer] = Math.random() < 0.5 ? [X, O] : [O, X];
    controller.set('player', player);
    controller.set('computer', computer);

    // whose turn it is currently
    // X goes first
    controller.set('current', X);

    // reset values
    // prevent times from firing during reset
    if (controller.computerBusy) {
      clearTimeout(controller.computerBusy);
    }

    controller.set('status', '');
    controller.set('gameOver', '');
    controller.update(false);
  }
}
