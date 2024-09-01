import { Link } from 'react-router-dom';
import '../globals.css';

export default function Home() {
    return (
        <div className='container'>
            <h2>Arrumar boneco</h2>
            <div className="card-container">
                <Link to="/matricula/cadastrar" className="card">
                    <div>Adicionar Boneco</div>
                </Link>
                <Link to="/matriculas" className="card">
                    <div>Lista de Boneco</div>
                </Link>
                <Link to="/matriculas/alterar" className="card">
                    <div>Editar Boneco</div>
                </Link>
            </div>
        </div>
    );
}
