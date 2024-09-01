import { useState } from 'react';
import '../globals.css';
import { useNavigate } from 'react-router-dom';


export default function CreateMatricula() {
  const [nome, setNome] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [material, setMaterial] = useState('');
  const [preco, setPreco] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Converter o valor de preco para número
    const novoBoneco = { 
      nome, 
      tamanho, 
      material, 
      preco: parseFloat(preco) // Conversão de string para número
    };
  
    try {
      const response = await fetch('http://localhost:5000/boneco', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoBoneco),
      });
      if (response.ok) {
        alert('Boneco criada com sucesso!');
        setNome('');
        setTamanho('');
        setMaterial('');
        setPreco('');
        navigate("/boneco");
      } else {
        alert('Erro ao criar Boneco.');
      }
    } catch (error) {
      console.error('Erro ao criar Boneco:', error);
    }
  };
  

  return (
    <div className='container'>
    <form  className="form-container" onSubmit={handleSubmit}>
      <h2>Criar Boneco</h2>
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
        placeholder="Material"
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        required
      />

       <input
        type="text"
        placeholder="preco"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        required
      />


      <button type="submit">Criar Boneco</button>
    
    </form>
    </div>
    
  );
}
