import { useEffect, useState } from 'react';
import '../globals.css';

export default function ReadMatricula() {
  const [boneco, setBoneco] = useState([]);


  useEffect(() => {
    const fetchBoneco = async () => {
      try {
        const response = await fetch('http://localhost:5000/boneco');
        const data = await response.json();
        setBoneco(data);
      } catch (error) {
        console.error('Erro ao buscar os boneco:', error);
      }
    };

    fetchBoneco();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/boneco/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {

        setBoneco(boneco.filter((boneco) => boneco._id !== id));
        alert('boneco excluídos com sucesso!');
      } else {
        alert('Erro ao excluir boneco.');
      }
    } catch (error) {
      console.error('Erro ao excluir boneco:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Lista de Bonecos</h2>
      <table  className="table-container" border="1">
        <thead>
          <tr>
            <th>Código do boneco</th>
            <th>Nome</th>
            <th>estilo</th>
            <th>Preço</th>
            <th>tamanho</th>
            <th>ação final</th>
          </tr>
        </thead>
        <tbody>
          {boneco.map((boneco) => (
            <tr key={boneco._id}>
              <td>{boneco._id}</td>
              <td>{boneco.nome}</td>
              <td>{boneco.material}</td>
              <td>{boneco.acao}</td>
              <td>{boneco.tamanho}</td>
              <td>
                <button onClick={() => handleDelete(boneco._id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
