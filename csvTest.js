const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: './output.csv',
  append: true,
  header: [
    {id: 'title', title: 'title'},
    {id: 'description', title: 'description'},
    
  ]
});

const data = [
  {
    title: 'John',
    description: 'Snow',
  }, {
    title: 'John',
    description: 'Snow',
  },
  {
    title: 'John',
    description: 'Snow',
  },
  {
    title: 'John',
    description: 'Snow',
  },
];

csvWriter
  .writeRecords(data)
  .then(()=> console.log('The CSV file was written successfully'));