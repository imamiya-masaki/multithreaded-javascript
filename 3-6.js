const {
    Worker,
    isMainThread,
    MessageChannel,
    workerData
} = require('worker_threads');

console.log('mainthread', isMainThread)

if (isMainThread) {
    // key名として、port1,port2になってる
    const { port1, port2 } = new MessageChannel()
    const worker = new Worker(__filename, {
        workerData: {
            port: port2
        },
        transferList: [port2]
    });
    port1.on('message', msg => {
        console.log('mes', msg);
        // console.log('port2', port2)
        // port1がpostMessageすると、port2へ飛ぶ
        port1.close()
        port1.postMessage(msg);
    })
} else {
    // workerDataからport2を取得
    const { port } = workerData;
    port.on('message', msg => {
        console.log('wegot', msg);
    })
    // closeすると、messageを受け取れなくなる
    // どちらかでcloseすると2つのペアしかないので、もう片方もmessageを受け取った後に閉じる
    // port.close()
    port.postMessage('Hello world');
    
}

/**
 * mainthread true
mainthread false
mes Hello world
wegot Hello world
 */