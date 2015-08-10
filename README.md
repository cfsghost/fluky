# fluky

A framework with flux data flow pattern and ECMAScript 6+. The dispatcher is implemented by ES6 generator to handle all of events.

[![NPM](https://nodei.co/npm/fluky.png)](https://nodei.co/npm/fluky/)

## Installation

Install fluky via NPM:
```
npm install fluky
```

Note that fluky is using `require` and `EventEmitter` of Node.js, you must have browserify to make it work for front-end purpose.

## Usage

In the past, lack of framework cause Flux has high learning curve. That means if we want to use it, we must know exactly parts: the ___dispatcher___, the ___actions___, the ___stores___, and the ___views___. With `flux` NPM Module provided by Facebook, rough implementation is not easy to use and understand for newbies.

But now, writing a Flux application is quite easy with fluxer.js framework, just like MVC architecture if task is not complicated. It is possible to make developer be able to focus on ___stores___ and ___views___, and no need to take care and take time on ___dispatcher___ and ___actions___ anymore.

## Demo

Just like other front-end framework, fluky has an TodoMVC example for demostration as well.

Change working directory then initializing and starting it with NPM command:
```
cd examples/todomvc/
npm install
npm start
```

Now you can open `index.html` with browser immediately.

## Authors

Copyright(c) 2015 Fred Chien <<cfsghost@gmail.com>>

## License

Licensed under the MIT License
