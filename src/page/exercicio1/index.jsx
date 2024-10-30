import React, { useState } from 'react';
import { multiply, add, subtract, transpose, det } from 'mathjs';

function renderMatrix(matrix) {
  return (
    <table className="min-w-full border border-gray-300 text-center">
      <tbody>
        {matrix.map((row, i) => (
          <tr key={i}>
            {row.map((value, j) => (
              <td
                key={j}
                className="border border-gray-300 px-4 py-2"
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function MatrixOperations() {
  const defaultA = [
    [3, 1, 4],
    [-2, 0, 1],
    [1, 2, 2]
  ];
  const defaultB = [
    [1, 0, 2],
    [-3, 1, 1],
    [2, -4, 1]
  ];

  const [matrixA, setMatrixA] = useState(defaultA);
  const [matrixB, setMatrixB] = useState(defaultB);

  const handleMatrixChange = (e, setMatrix, defaultMatrix) => {
    const { name, value } = e.target;
    const [i, j] = name.split('-').map(Number);

    const updatedMatrix = setMatrix === setMatrixA ? matrixA.map(row => [...row]) : matrixB.map(row => [...row]);
    updatedMatrix[i][j] = value !== '' ? parseFloat(value) : defaultMatrix[i][j];
    setMatrix(updatedMatrix);
  };

  const twoA = multiply(2, matrixA);
  const AplusB = add(matrixA, matrixB);
  const twoAminus3B = subtract(multiply(2, matrixA), multiply(3, matrixB));
  const transTwoAminusTrans3B = subtract(transpose(twoA), transpose(multiply(3, matrixB)));
  const AB = multiply(matrixA, matrixB);
  const BA = multiply(matrixB, matrixA);
  const detA = det(matrixA);
  const detB = det(matrixB);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Operações com Matrizes</h1>

      <h2 className="text-xl font-semibold mb-4">Defina os valores das matrizes A e B</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Matriz A</h3>
          {defaultA.map((row, i) => (
            <div key={i} className="mb-2">
              {row.map((_, j) => (
                <input
                  key={`${i}-${j}`}
                  name={`${i}-${j}`}
                  type="number"
                  value={matrixA[i][j]}
                  onChange={(e) => handleMatrixChange(e, setMatrixA, defaultA)}
                  className="border border-gray-300 rounded px-2 py-1 w-12 text-center"
                />
              ))}
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Matriz B</h3>
          {defaultB.map((row, i) => (
            <div key={i} className="mb-2">
              {row.map((_, j) => (
                <input
                  key={`${i}-${j}`}
                  name={`${i}-${j}`}
                  type="number"
                  value={matrixB[i][j]}
                  onChange={(e) => handleMatrixChange(e, setMatrixB, defaultB)}
                  className="border border-gray-300 rounded px-2 py-1 w-12 text-center"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Resultados das Operações</h2>
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <p className="font-bold">Resultados:</p>
        <p><strong>(a) 2A:</strong></p>
        {renderMatrix(twoA)}
        <p><strong>(b) A + B:</strong></p>
        {renderMatrix(AplusB)}
        <p><strong>(c) 2A − 3B:</strong></p>
        {renderMatrix(twoAminus3B)}
        <p><strong>(d) (2A)<sup>T</sup> − (3B)<sup>T</sup>:</strong></p>
        {renderMatrix(transTwoAminusTrans3B)}
        <p><strong>(e) AB:</strong></p>
        {renderMatrix(AB)}
        <p><strong>(f) BA:</strong></p>
        {renderMatrix(BA)}
        <p><strong>(g) det(A):</strong> {detA}</p>
        <p><strong>(h) det(B):</strong> {detB}</p>
      </div>
    </div>
  );
}

export default MatrixOperations;
