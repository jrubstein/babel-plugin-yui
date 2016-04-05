# babel-plugin-yui

Support for YUI

## Example

**In**

```js
// input code
```

**Out**

```js
"use strict";

// output code
```

## Installation

```sh
$ npm install babel-plugin-yui
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["yui"]
}
```

### Via CLI

```sh
$ babel --plugins yui script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["yui"]
});
```
