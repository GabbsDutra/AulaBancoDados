import { Link } from 'react-router-dom';
import '../globals.css';

export default function Home() {
    return (
        <div className='container'>
            <h2>Sistema Acadêmico</h2>
            <div className="card-container">
                <Link to="/boneco/cadastrar" className="card">
                    <div>Registrar boneco</div>
                </Link>
                <Link to="/boneco" className="card">
                    <div>Lista de boneco</div>
                </Link>
                <Link to="/boneco/alterar" className="card">
                    <div>Editar boneco</div>
                </Link>
            </div>
        </div>
    );
}
