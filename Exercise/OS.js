const os=require("os");
// console.log(os);
console.log(os.arch()); //architecture
console.log(os.freemem()/(1024*1024*1024)); //free ram
console.log(os.totalmem()/(1024*1024*1024)); //total ram
console.log(os.hostname());
console.log(os.platform());
console.log(os.userInfo());