import RSMQWorker from "rsmq-worker"
var worker = new RSMQWorker("myqueue");

worker.on("message", function (msg, next, id) {
  // process your message
  console.log("Message id : " + id);
  console.log(msg);
  next()
});

worker.start()
