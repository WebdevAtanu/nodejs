const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync("RPC-service.proto");
const greeter = grpc.loadPackageDefinition(packageDefinition).Greeter;

const client = new greeter('localhost:50051', grpc.credentials.createInsecure());

client.SayHello({ name: "Atanu" }, (err, response) => {
    console.log('Greeting:', response.message);
});
