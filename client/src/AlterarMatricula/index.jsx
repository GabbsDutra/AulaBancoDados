import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdateMatricula() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [preco, setPreco] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const atualizacao = { nome, tamanho, preco };

    try {
      const response = await fetch(`http://localhost:5000/boneco/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(atualizacao),
      });
      if (response.ok) {
        alert('Matrícula atualizada com sucesso!');
        navigate("/matriculas");
      } else {
        alert('Erro ao atualizar matrícula.');
      }
    } catch (error) {
      console.error('Erro ao atualizar matrícula:', error);
    }
  };

  return (
    <div className='container'>
    <form  className="form-container" onSubmit={handleSubmit}>
      <h2>Atualizar Boneco</h2>
      <input
        type="text"
        placeholder="ID do Boneco"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
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
        placeholder="preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        required
      />
      <button type="submit">Atualizar Boneco na lista</button>
    </form>
    </div>
  );
}
