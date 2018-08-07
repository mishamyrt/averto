# Averto [![Build Status](https://travis-ci.org/mishamyrt/averto.svg?branch=master)][ci]

<img src="https://raw.githubusercontent.com/mishamyrt/averto/readme-update/img/screenshot.png" align="right"
     alt="Averto dialog screenshot" width="400" height="188">

Averto is beautiful replacement for the `alert()` function.

**UX.** The main advantage is that the averto is not modal. 
This means that the notification does not block the interface.

**Small.** {x} bytes (minified and gzipped). No dependencies.

**Accessible.** All options are used to increase availability.


## Get

[Download the repository code](https://github.com/mishamyrt/averto/archive/master.zip) and move `dist/averto.js` to the desired directory.

Or use npm:

```bash
$ npm install mishamyrt-averto --save
```

## Setup

Link the file `averto.js` from the compiled sources.

If downloaded directly:
```html
<!-- Head -->
<script src="path/to/averto.js" type="text/javascript"></script>
```

If installed with npm:

```html
<!-- Head -->
<script src="node_modules/mishamyrt-averto/dist/averto.js"
        type="text/javascript"></script>
```

Then, call the function 

```js
Averto.show({
    title: 'Hello world!'
})
```

### Using as a CommonJS or ES6 module

Averto can be used as a module, so you can use it within webpack or rollup build systems.

First, install Averto using npm:

```bash
$ npm install mishamyrt-averto --save-dev
```

Then, use it as CommonJS or ES6 module somewhere in your program:

```js
// ES6
import Averto from 'mishamyrt-averto'
// CommonJS
var Averto = require('mishamyrt-averto')

// Modifies the DOM, adjusts itself
Averto.initiate()
```

## Options

You can configure Averto by specifying parameters when calling functon:

```js
Averto.show({
    timeout: 3000,
    autohide: true,
    color: '#663399',
    title: 'WOW!',
    message: 'Look at that color!',
    blocking: false,
})
```

* `timeout` - Delay before message will hidden
* `autohide` - It seems to be obvious
* `color` - Why do I write documentation?
* `title` - Message title. The only mandatory parameter
* `message` - Text for the second line
* `blocking` - Makes the message modal

Also there is a parameter for debugging:

```js
parameters.debug = {
    background = '#fff'
}
```

Dyes the container's background to the specified one


## Supported browsers

I support IE 11, Safari 10+ and the latest versions of Chrome, Firefox and Edge. Averto could work in the older versions too, but i don’t do anything specific to maintain its compatibility with them and don’t test it there.

[ci]: https://travis-ci.org/mishamyrt/averto