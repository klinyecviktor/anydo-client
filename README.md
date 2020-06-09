# anydo-client &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/klinyecviktor/anydo-client/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/anydo-client.svg?style=flat)](https://www.npmjs.com/package/anydo-client)

Anydo-client is unofficial Node.js wrapper for [Any.do](https://any.do) API.

## Installation
```
$ npm install anydo-client
```

## Usage
```ts
const { AnyDoApi } = require('anydo-client')

const api = new AnyDoApi('your_email', 'your_password');

const categories = await api.getCategoryList() // Get category list
const tasks = (await api.findTasksByDefaultCategory()).getTasksForToday() // Get tasks for today from default category
```

### TODO

- [x] Get tasks
- [x] Get categories
- [x] Tasks for today
- [x] Tasks from default category
- [ ] Add task and category
- [ ] Update task and category
- [ ] Remove task and category

### License

React is [MIT licensed](./LICENSE).
