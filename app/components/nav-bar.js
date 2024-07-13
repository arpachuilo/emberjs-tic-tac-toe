import Component from '@glimmer/component';
import { action } from '@ember/object';
import ENV from 'tic-tac-toe/config/environment';

export default class NavBarComponent extends Component {
  @action
  reload() {
    // test component gets very upset if LinkTo force refreshes
    if (ENV.environment !== 'test') location.reload();
  }
}
