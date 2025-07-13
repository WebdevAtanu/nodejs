const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load proto
const packageDefinition = protoLoader.loadSync('RPC-service.proto');
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const greeter = grpcObject.Greeter;

// Implementation
function sayHello(call, callback) {
    callback(null, { message: `Hello ${call.request.name}` });
}

// Server setup
const server = new grpc.Server();
server.addService(greeter.service, { SayHello: sayHello });

// Bind and start (no need for server.start())
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Server running at http://0.0.0.0:50051');
});
