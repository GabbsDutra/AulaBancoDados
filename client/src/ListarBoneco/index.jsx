import { useEffect, useState } from 'react';
import '../globals.css';

export default function ReadBoneco() {
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
      const response = await fetch(`http://localhost:5000/matriculas/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {

        setMatriculas(matriculas.filter((matricula) => matricula._id !== id));
        alert('bonecos excluídos com sucesso!');
      } else {
        alert('Erro ao excluir bonecos.');
      }
    } catch (error) {
      console.error('Erro ao excluir bonecos:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Lista de Bonecos</h2>
      <table  className="table-container" border="1">
        <thead>
          <tr>
            <th>Código do boneco</th>
            <th>preço</th>
            <th>estilo</th>
            <th>material</th>
            <th>tamanho</th>
          </tr>
        </thead>
        <tbody>
          {boneco.map((bonecos) => (
            <tr key={bonecos._id}>
              <td>{bonecos._id}</td>
              <td>{bonecos.estilo}</td>
              <td>{bonecos.material}</td>
              <td>{bonecos.tamanho}</td>
              <td>
                <button onClick={() => handleDelete(bonecos._id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
