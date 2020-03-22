const uuid = require('uuid/v4')

exports.stacks = ['React', 'TypeScript', 'JavaScript'].map(name => ({
  id: uuid(),
  name,
}))
