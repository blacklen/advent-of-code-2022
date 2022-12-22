export const getTimeExecution = (func) => {
  var startTime = performance.now()

  func() // <---- measured code goes between startTime and endTime

  var endTime = performance.now()

  console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
}
