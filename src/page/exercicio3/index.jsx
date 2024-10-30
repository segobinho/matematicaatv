import React, { useState } from 'react';
import * as math from 'mathjs';

const SolucionadorEquacoes = () => {
  // Definindo os sistemas de equações
  const sistemas = [
    { label: 'Sistema (a)', A: [[1, 2, -1], [2, -1, 3], [3, 3, -2]], b: [2, 9, 3] },
    { label: 'Sistema (b)', A: [[1, 1, 0], [1, 0, -1], [0, 1, -1]], b: [10, 5, 3] },
    { label: 'Sistema (c)', A: [[2, 4, 0], [2, 0, 1]], b: [1, 0] },
    { label: 'Sistema (d)', A: [[1, 2, 1, 1], [1, 3, -1, 2]], b: [2, 1] },
    { label: 'Sistema (e)', A: [[1, 1, 1], [0, 3, -1], [0, 0, 1]], b: [2, 1, 7] },
    { label: 'Sistema (f)', A: [[1, 2, 1], [1, 3, -1]], b: [0, 1] },
  ];

  const [resultados, setResultados] = useState([]);
  const [sistemaAtivo, setSistemaAtivo] = useState(null);

  const resolverSistema = (index) => {
    const sistema = sistemas[index];
    if (sistemaAtivo === index) {
      setSistemaAtivo(null); // Fechar se já está ativo
      return;
    }
    const novaSolucao = resolverSistemas(sistema);
    setResultados((prev) => {
      const novosResultados = [...prev];
      novosResultados[index] = novaSolucao;
      return novosResultados;
    });
    setSistemaAtivo(index);
  };

  const resolverSistemas = (sistema) => {
    try {
      // Calcular a decomposição LU
      const LU = math.lusolve(sistema.A, sistema.b);
      const solucao = LU.map((v) => v[0].toFixed(2));

      // Montar a string de cálculo detalhado
      const detalhes = `
        Matriz A: ${JSON.stringify(sistema.A)} \n
        Vetor b: ${JSON.stringify(sistema.b)} \n
        Solução: ${solucao.join(', ')}
      `;

      return { label: sistema.label, solucao, detalhes };
    } catch (error) {
      return { label: sistema.label, solucao: 'Sem solução ou sistema dependente', detalhes: error.message };
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Soluções de Sistemas de Equações Lineares</h1>
      <ul className="space-y-2">
        {sistemas.map((sistema, index) => (
          <li key={index} className="mb-4">
            <button 
              onClick={() => resolverSistema(index)} 
              className="w-full py-2 mb-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-200"
            >
              {sistema.label}
            </button>
            {sistemaAtivo === index && resultados[index] && (
              <div className="p-4 bg-gray-100 rounded-lg shadow">
                <strong className="text-lg">{resultados[index].label}:</strong> 
                <span className="ml-2">
                  {Array.isArray(resultados[index].solucao) ? 
                    `x = ${resultados[index].solucao[0]}, y = ${resultados[index].solucao[1]}, z = ${resultados[index].solucao[2] ?? ''}, t = ${resultados[index].solucao[3] ?? ''}` 
                    : resultados[index].solucao}
                </span>
                <pre className="mt-2 text-sm text-gray-600">{resultados[index].detalhes}</pre>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SolucionadorEquacoes;
