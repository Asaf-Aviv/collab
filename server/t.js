process.on('', code => {
  console.log('restore')
  process.exit()
})

let i = 0
setInterval(() => {
  console.log(i)
  i++
  if (i === 100) {
    process.exit()
  }
}, 20)
