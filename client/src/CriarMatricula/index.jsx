import { useState } from 'react';
import '../globals.css';
import { useNavigate } from 'react-router-dom';


export default function CreateBoneco() {
  const [aluno, setAluno] = useState('');
  const [turma, setTurma] = useState('');
  const [curso, setCurso] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const novaMatricula = { aluno, turma, curso };

    try {
      const response = await fetch('http://localhost:5000/bonecos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaMatricula),
      });
      if (response.ok) {
        alert('Matrícula criada com sucesso!');
        setAluno('');
        setTurma('');
        setCurso('');
        navigate("/matriculas");
      } else {
        alert('Erro ao criar matrícula.');
      }
    } catch (error) {
      console.error('Erro ao criar matrícula:', error);
    }
  };

  return (
    <div className='container'>
    <form  className="form-container" onSubmit={handleSubmit}>
      <h2>Criar Matrícula</h2>
      <input
        type="text"
        placeholder="Nome do Aluno"
        value={aluno}
        onChange={(e) => setAluno(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Turma"
        value={turma}
        onChange={(e) => setTurma(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Curso"
        value={curso}
        onChange={(e) => setCurso(e.target.value)}
        required
      />
      <button type="submit">Criar Matrícula</button>
    </form>
    </div>
  );
}
