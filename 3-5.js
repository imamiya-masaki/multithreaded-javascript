const {
    Worker,
    isMainThread,
    parentPort
} = require('worker_threads');

console.log('mainthread', isMainThread)

if (isMainThread) {
    const worker = new Worker(__filename);
    worker.on('message', msg => {
        console.log('mes', msg);
        worker.postMessage(msg);
    })
} else {
    parentPort.on('message', msg => {
        console.log('wegot', msg);
    })
    parentPort.postMessage('Hello world');
}