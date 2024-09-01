import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdateBoneco() {
  const [nome, setNome] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [material, setMaterial] = useState('');
  const [preco, setPreco] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const atualizacao = { nome, tamanho, material, preco };

    try {
      const response = await fetch(`http://localhost:5000/boneco/${nome}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(atualizacao),
      });
      if (response.ok) {
        alert('Boneco atualizada com sucesso!');
        navigate("/boneco");
      } else {
        alert('Erro ao atualizar Boneco.');
      }
    } catch (error) {
      console.error('Erro ao atualizar Boneco:', error);
    }
  };

  return (
    <div className='container'>
    <form  className="form-container" onSubmit={handleSubmit}>
      <h2>Atualizar Boneco</h2>
      <input
        type="text"
        placeholder="Nome do Boneco"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Estilo"
        value={tamanho}
        onChange={(e) => setTamanho(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Material"
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        required
      />
      <input
        type=""
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        required
      />
      <button type="submit">Atualizar Boneco</button>
    </form>
    </div>
  );
}
