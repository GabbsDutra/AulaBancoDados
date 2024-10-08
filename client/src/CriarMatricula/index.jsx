import { useState } from 'react';
import '../globals.css';
import { useNavigate } from 'react-router-dom';


export default function CreateMatricula() {
  const [nome, setNome] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [preco, setPreco] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const novoBoneco = { nome, tamanho, preco };

    try {
      const response = await fetch('http://localhost:5000/boneco', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoBoneco),
      });
      if (response.ok) {
        alert('boneco criado com sucesso!');
        setNome('');
        setTamanho('');
        setPreco('');
        navigate("/matriculas");
      } else {
        alert('Erro ao criar boneco.');
      }
    } catch (error) {
      console.error('Erro ao criar boneco:', error);
    }
  };

  return (
    <div className='container'>
    <form  className="form-container" onSubmit={handleSubmit}>
      <h2>Criar boneco</h2>
      <input
        type="text"
        placeholder="Nome do Boneco"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Tamanho"
        value={tamanho}
        onChange={(e) => setTamanho(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        required
      />
      <button type="submit">Adicionar boneco</button>
    </form>
    </div>
  );
}
