# node-red-contrib-scatter-gather

Executes [Node-Red](http://nodered.org) nodes in parallel following the [scatter/gather](http://www.enterpriseintegrationpatterns.com/patterns/messaging/BroadcastAggregate.html) pattern.

[![NodeRed](https://img.shields.io/badge/Node--Red-0.16.2-red.svg)](http://nodered.org)
[![NodeJS](https://img.shields.io/badge/Node.js-6.10.2-brightgreen.svg)](https://nodejs.org)
[![ESLint](https://img.shields.io/badge/codestyle-eslint-green.svg)](http://eslint.org)

## Pre-requisites

Requires [Node-Red](http://nodered.org) version 0.16.2 or more recent.

## Installation

    $ npm i -S node-red-contrib-scatter-gather

## Usage

Sends a request message to multiple nodes concurrently, and aggregates them into a single message.

<img width="758" alt="screen shot 2017-05-18 at 6 57 52 pm" src="https://cloud.githubusercontent.com/assets/361140/26225161/3cc34fa8-3bfc-11e7-9cb8-382f00c858e7.png">

## Development

##### 1. Clone the project

    $ git clone https://github.com/sciensa/node-red-contrib-scatter-gather.git

##### 2. Go to the project directory

    $ cd node-red-contrib-br-validations

##### 3. Install the dependencies

    $ npm install

##### 4. Run the unit tests

    $ npm run test:unit

##### 5. Link the project

    $ npm link
    
##### 6. Run the node-red and enjoy!

## Contributing

1. Follow the [Semantic Versioning Specification](http://semver.org/).
2. Follow the [GitHub Flow](https://guides.github.com/introduction/flow/).
3. Follow the [5 Useful Tips For A Better Commit Message](https://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-message) article and the [How to Write a Git Commit Message](http://chris.beams.io/posts/git-commit/) post.
4. Install and use [Commitizen](http://commitizen.github.io/cz-cli/).
5. Bug reports and pull requests are welcome on [GitHub](https://github.com/sciensa/node-red-contrib-scatter-gather/issues).
6. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The node is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
