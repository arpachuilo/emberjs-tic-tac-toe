# tic-tac-toe

Tic Tac Toe project for FeedbackFruits :)

# Ember.js Reflections

I found the ember.js documentation to be very helpful for getting started by just following their tutorial. It helped having experience with template engines before. It sort of reminded me of Vue in some ways. I was able to follow along mostly while I just stubbed out setting up material design lite and how the page would be rendered out. I started with having all my data contained at the component level, which worked well enough for tic tac toe. It was when I wanted to try and dig deeper into the framework I found the tutorial to be not as great as I’d have liked.

I eventually moved the game logic/data over into the controller level after learning a bit more because I wanted to support various m,n,k game sizes. Also looked into using an ember model, but decided against that for the time. It was around when I started moving data outside the component and wanting to use query parameters I was having issues with the documentation alone. I started using external sites at this point. I found a few github issues and stackoverflow posts to be somewhat helpful, but a lot of them followed some outdated documentation. I actually ended up using ChatGPT to generate examples of how to do things in the application while I was learning the framework.

I would have to say the most enjoyable part was their client setting up all the scaffolding, albeit I’m not a fan of the “magic” under the hood it works well. I also really liked how tests are set up, a lot better than my previous experience getting tests setup in react actually. Given more time I would have delved into better ways to manage my applications state and even start setting up a backend. I also would have updated to the newer material library to make things pretty.

Overall I found the experience rather enjoyable, tic tac toe was a fun thing to implement and I had fun expanding it to m,n,k.


## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Google Chrome](https://google.com/chrome/)

## Installation

- `git clone <repository-url>` this repository
- `cd tic-tac-toe`
- `yarn install`

## Running / Development

- `yarn start`
- Visit your app at [http://localhost:4200](http://localhost:4200).
- Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

- `yarn test`
- `yarn test:ember --server`

### Linting

- `yarn lint`
- `yarn lint:fix`

### Building

- `yarn ember build` (development)
- `yarn build` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- [ember-cli](https://cli.emberjs.com/release/)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
