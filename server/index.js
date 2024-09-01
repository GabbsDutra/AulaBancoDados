const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();

app.use(cors());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let collection;

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('bonecodb');
    collection = db.collection('boneco');

  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

connectDB();

app.use(express.json()); 


app.post('/boneco', async (req, res) => {
  try {
    const novoBoneco = req.body;

    const result = await collection.insertOne(novoBoneco);
    
    res.status(201).json({ message: 'Boneco criada com sucesso', matriculaId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar Boneco', error: err });
  }
});

app.get('/boneco', async (req, res) => {
  try {

    const boneco = await collection.find().toArray();

    res.status(200).json(boneco);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar Bonecos', error: err });
  }
});

const { ObjectId } = require('mongodb');

app.get('/boneco/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);

    const matricula = await collection.findOne({ _id: newId });


    if (!matricula) {
      res.status(404).json({ message: 'Boneco não encontrado' });
    } else {
      res.status(200).json(matricula);
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar Boneco', error: err });
  }
});

app.put('/boneco/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);
    const atualizacao = req.body;

    const result = await collection.updateOne( { _id: newId }, { $set: atualizacao });

    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Boneco não encontrado' });
    } else {
      res.status(200).json({ message: 'Boneco atualizada com sucesso' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar Boneco', error: err });
  }
});

app.delete('/boneco/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);

    const result = await collection.deleteOne({ _id: newId });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Boneco não encontrado' });
    } else {
      res.status(200).json({ message: 'Boneco excluída com sucesso' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir Boneco', error: err });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
