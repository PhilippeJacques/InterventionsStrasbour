const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const { createObjectCsvWriter } = require('csv-writer');

const app = express();
const port = 3000;
const csvFilePath = 'assets/interventions.csv';

app.use(cors());
app.use(bodyParser.json());

// Read CSV Data
app.get('/api/interventions', (req, res) => {
  const results = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    });
});

// Save CSV Data
app.post('/api/save-csv', (req, res) => {
  const csvWriter = createObjectCsvWriter({
    path: csvFilePath,
    header: [
      { id: 'Adresse', title: 'Adresse' },
      { id: 'Statut de l\'intervention', title: 'Statut de l\'intervention' },
      { id: 'Type d\'intervention', title: 'Type d\'intervention' },
      { id: 'Précision de l\'intervention', title: 'Précision de l\'intervention' }
    ]
  });

  csvWriter.writeRecords(req.body)
    .then(() => res.status(200).send('CSV file updated successfully'))
    .catch(error => res.status(500).send(error));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
