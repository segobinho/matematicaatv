import React, { useState } from 'react';
import { create, all } from 'mathjs';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

const math = create(all);


ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, Title);

const EquationSolver = () => {
  const [result, setResult] = useState(null); 
  const [chartData, setChartData] = useState(null); 
  const equations = [
    { a: 2, b: -1, c: 0, d: 3, e: -1, f: 2 }, 
    { a: 1, b: -1, c: 9, d: 2, e: 4, f: 7 }, 
    { a: 2, b: -1, c: 1, d: 4, e: -2, f: 1 }, 
    { a: 2, b: -6, c: 1, d: 1, e: -4, f: 4 } 
  ];

  const roundLargeNumber = (number) => {
    const threshold = 100000; 
    if (Math.abs(number) > threshold) {
      return number.toExponential(1); 
    }
    return number.toFixed(2); 
  };

  const solveEquation = (index) => {
    const eq = equations[index];
    const matrix = [
      [eq.a, eq.b],
      [eq.d, eq.e]
    ];
    const results = [eq.c, eq.f];

    const determinant = math.det(matrix);

    if (determinant === 0) {
      setResult(`Sistema ${index + 1}: não tem solução única (singular)`);
      setChartData(null); 
    } else {
      const solution = math.lusolve(matrix, results);
      const x = roundLargeNumber(solution[0][0]);
      const y = roundLargeNumber(solution[1][0]);
      setResult(`Sistema ${index + 1}: x = ${x}, y = ${y}`);

      const line1 = { 
        label: `2x - y = ${eq.c}`, 
        data: generateLineData(eq.a, eq.b, eq.c)
      };
      const line2 = { 
        label: `3x - y = ${eq.f}`, 
        data: generateLineData(eq.d, eq.e, eq.f)
      };
      setChartData({
        labels: Array.from({ length: 100 }, (_, i) => i - 50), 
        datasets: [
          { ...line1, borderColor: 'blue', fill: false },
          { ...line2, borderColor: 'red', fill: false }
        ]
      });
    }
  };

  const generateLineData = (a, b, c) => {
    const xValues = Array.from({ length: 100 }, (_, i) => i - 50); 
    const yValues = xValues.map(x => (a * x + c).toFixed(2)); 
    return xValues.map((x, index) => ({ x, y: yValues[index] }));
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Solução de Sistemas de Equações</h1>
      <div className="space-y-2">
        {equations.map((_, index) => (
          <button
            key={index}
            onClick={() => solveEquation(index)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Resolver Sistema {index + 1}
          </button>
        ))}
      </div>
      {result && (
        <div className="mt-5">
          <h3 className="text-lg">{result}</h3>
        </div>
      )}
      {chartData && (
        <div className="mt-5">
          <h2 className="text-xl mb-3">Representação Gráfica:</h2>
          <Line 
            data={chartData} 
            options={{ 
              responsive: true,
              scales: {
                x: {
                  type: 'linear',
                  position: 'bottom',
                },
                y: {
                  beginAtZero: true,
                }
              }
            }} 
          />
        </div>
      )}
    </div>
  );
};

export default EquationSolver;
