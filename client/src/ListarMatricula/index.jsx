import { useEffect, useState } from 'react';
import '../globals.css';

export default function ReadMatriculas() {
  const [boneco, setBoneco] = useState([]);


  useEffect(() => {
    const fetchMatriculas = async () => {
      try {
        const response = await fetch('http://localhost:5000/boneco');
        const data = await response.json();
        setBoneco(data);
      } catch (error) {
        console.error('Erro ao buscar as matrículas:', error);
      }
    };

    fetchMatriculas();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/boneco/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {

        setBoneco(boneco.filter((boneco) => boneco._id !== id));
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
            <th>Código Matrícula</th>
            <th>Nome do boneco</th>
            <th>Turma</th>
            <th>Curso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {boneco.map((boneco) => (
            <tr key={boneco._id}>
              <td>{boneco._id}</td>
              <td>{boneco.nome}</td>
              <td>{boneco.tamanho}</td>
              <td>{boneco.preco}</td>
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
