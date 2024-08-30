import { useEffect, useState } from 'react';
import '../globals.css';

export default function ReadBoneco() {
  const [boneco, setboneco] = useState([]);


  useEffect(() => {
    const fetchBoneco = async () => {
      try {
        const response = await fetch('http://localhost:5000/boneco');
        const data = await response.json();
        setBoneco(data);
      } catch (error) {
        console.error('Erro ao buscar as matrículas:', error);
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
        alert('Matrícula excluída com sucesso!');
      } else {
        alert('Erro ao excluir matrícula.');
      }
    } catch (error) {
      console.error('Erro ao excluir matrícula:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Lista de Matrículas</h2>
      <table  className="table-container" border="1">
        <thead>
          <tr>
            <th>Código do boneco</th>
            <th>Nome do boneco</th>
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
                <button onClick={() => handleDelete(matricula._id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
