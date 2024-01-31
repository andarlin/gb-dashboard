const fs = require('fs');

// fs.writeFileSync('hello.txt', 'Hello from Node.js');

const data = JSON.parse(fs.readFileSync('../data.json', 'utf8'));

console.log(data[0].firstName);

data.append({firstName: 'John', lastName: 'Doe'});