import fs from 'node:fs';

fs.writeFile('file.txt', 'File content', (err) => {
    if (err) throw err;
    console.log('File has been written successfully.');
  });