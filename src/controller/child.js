process.on('message', (msg) => {
    console.log('Message from parent:', msg);
  process.exit(0)

  });
  
//   let counter = 0;
  
//   setInterval(() => {
//     process.send({ counter: counter++ });
//   }, 1000);
  