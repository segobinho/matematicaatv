// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MatrixOperations from './page/exercicio1/index';
import EquationSolver from './page/exercicio2/index'; // Importando o novo componente
import SolucionadorEquacoes from './page/exercicio3';

function App() {
  return (
    <Router>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-8">Bem-vindo ao Sistema de Resolução de Equações</h1>
        <div className="space-x-4">
          <Link to="/">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Operações de Matriz</button>
          </Link>
          <Link to="/linear-systems">
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Resolver Sistemas Lineares</button>
          </Link>
          <Link to="/linear-systemss">
            <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Solucionador de Equações</button>
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<MatrixOperations />} />
          <Route path="/linear-systems" element={<EquationSolver />} /> {/* Nova rota */}
          <Route path="/linear-systemss" element={<SolucionadorEquacoes />} /> {/* Nova rota */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
