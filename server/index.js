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

    const db = client.db('bonecos');
    collection = db.collection('boneco');

  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

connectDB();

app.use(express.json()); 


app.post('/boneco', async (req, res) => {
  try {
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
    res.status(500).json({ message: 'Erro ao buscar boneco', error: err });
  }
});

const { ObjectId } = require('mongodb');

app.get('/matriculas/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);

    const boneco = await collection.findOne({ _id: newId });

    if (!boneco) {
      res.status(404).json({ message: 'boneco não encontrada' });
    } else {
      res.status(200).json(matricula);
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar boneco', error: err });
  }
});

app.put('/matriculas/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);
    const atualizacao = req.body;

    await collection.updateOne( { _id: newId }, { $set: atualizacao });

    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'boneco não encontrado' });
    } else {
      res.status(200).json({ message: 'boneco atualizado com sucesso' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar boneco', error: err });
  }
});

app.delete('/matriculas/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);

    const result = await collection.deleteOne({ _id: newId });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Matrícula não encontrada' });
    } else {
      res.status(200).json({ message: 'Matrícula excluída com sucesso' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir matrícula', error: err });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
