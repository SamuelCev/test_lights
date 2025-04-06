import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CotizacionServicio = () => {
  // Estados para manejar los inputs del usuario
  const [categoria, setCategoria] = useState('');
  const [estadoInicial, setEstadoInicial] = useState('');
  const [numeroSesiones, setNumeroSesiones] = useState(1);
  const [precio, setPrecio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Datos para las categorías
  const categorias = [
    { id: 'division', nombre: 'Division boost', imagen: '/api/placeholder/500/300' },
    { id: 'netwins', nombre: 'Net wins', imagen: '/api/placeholder/500/300' },
    { id: 'placements', nombre: 'Placements', imagen: '/api/placeholder/500/300' },
    { id: 'games', nombre: 'Games', imagen: '/api/placeholder/500/300' },
  ];

  // Datos para los estados iniciales
  const estadosIniciales = [
    { id: '20lp', nombre: '0lp-20lp' },
    { id: '´40lp', nombre: '20lp-40lp' },
    { id: '60lp', nombre: '40lp-60lp' },
    { id: '80lp', nombre: '80lp-99lp' },
  ];

  // Obtener la imagen de la categoría seleccionada
  const imagenCategoria = categoria 
    ? categorias.find(cat => cat.id === categoria)?.imagen 
    : null;

  // Función para realizar la cotización
  const realizarCotizacion = async () => {
    // Validar que todos los campos estén completos
    if (!categoria || !estadoInicial || !numeroSesiones) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Llamada a la API de Django
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const response = await axios.get(`${apiUrl}/calculate-price?championQuantity=2&streamingEnabled=false&isSoloOnly=true&isExpress=false&isDuoService=false&voiceEnabled=true&serviceType=0&region=0&currentRank=0&desiredRank=2&currentLp=45`);
      console.log("Preciooo: " + response.data)
      // Actualizar el precio con la respuesta
      setPrecio(response.data.price);
    } catch (err) {
      setError('Error al realizar la cotización. Intenta nuevamente.' + err);
      console.error('Error al cotizar:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:shrink-0 md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
            <img 
                  src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/764bbd9c-6d80-481d-8136-96848f01e843/ddx6pwa-f554b1c7-858f-4485-9551-665264d772c3.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzc2NGJiZDljLTZkODAtNDgxZC04MTM2LTk2ODQ4ZjAxZTg0M1wvZGR4NnB3YS1mNTU0YjFjNy04NThmLTQ0ODUtOTU1MS02NjUyNjRkNzcyYzMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BigyQGYIiZ0n2WWlQr4jfvzVR6g-Vgs1m9U1IJmY1z0"
                  height={800}
                  alt={`Imagen de ${categorias.find(cat => cat.id === categoria)?.nombre}`}
                  className="w-full h-auto rounded-lg transition-all duration-300 ease-in-out"
                />
          </div>
          
          <div className="p-8 md:w-1/2">
            <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold mb-1">
              Cotización de Servicios
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Personaliza tu servicio
            </h1>
            
            <div className="space-y-6">
              {/* Selector de Categoría */}
              <div>
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                  Categoría
                </label>
                <select
                  id="categoria"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Selector de Estado Inicial */}
              <div>
                <label htmlFor="estadoInicial" className="block text-sm font-medium text-gray-700">
                  Estado Inicial
                </label>
                <select
                  id="estadoInicial"
                  value={estadoInicial}
                  onChange={(e) => setEstadoInicial(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Selecciona el estado inicial</option>
                  {estadosIniciales.map((estado) => (
                    <option key={estado.id} value={estado.id}>
                      {estado.nombre}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Input de Número de Sesiones */}
              <div>
                <label htmlFor="numeroSesiones" className="block text-sm font-medium text-gray-700">
                  Número de Sesiones
                </label>
                <input
                  type="number"
                  id="numeroSesiones"
                  min="1"
                  value={numeroSesiones}
                  onChange={(e) => setNumeroSesiones(Math.max(1, parseInt(e.target.value) || 1))}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              {/* Botón de Cotizar */}
              <div>
                <button
                  onClick={realizarCotizacion}
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'Calculando...' : 'Calcular Cotización'}
                </button>
              </div>
              
              {/* Mensaje de error */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Resultado de la Cotización */}
              {precio !== null && (
                <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4 animate-fade-in">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <img 
                        height={800}
                        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/689827e2-f006-498a-a1e5-2c70425a2719/dee9njr-a49b4bc3-f794-4e2d-9578-c89122502c21.png/v1/fill/w_1280,h_1600/league_of_legends_challenger_rank_vector_by_masnera_dee9njr-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY4OTgyN2UyLWYwMDYtNDk4YS1hMWU1LTJjNzA0MjVhMjcxOVwvZGVlOW5qci1hNDliNGJjMy1mNzk0LTRlMmQtOTU3OC1jODkxMjI1MDJjMjEucG5nIiwiaGVpZ2h0IjoiPD0xNjAwIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvNjg5ODI3ZTItZjAwNi00OThhLWExZTUtMmM3MDQyNWEyNzE5XC9tYXNuZXJhLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.ZHwZwAdZzAZvrKk7Awemb0ikBp2_J4-FJTAqE_jI_Mg" 
                        alt="Cotización exitosa" 
                        className="h-5 w-5"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-lg font-medium text-green-800">
                        Precio estimado: ${precio.toLocaleString()}
                      </p>
                      <p className="text-sm text-green-700 mt-1">
                        Para {categorias.find(cat => cat.id === categoria)?.nombre}, {estadosIniciales.find(e => e.id === estadoInicial)?.nombre.toLowerCase()}, {numeroSesiones} {numeroSesiones === 1 ? 'sesión' : 'sesiones'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CotizacionServicio;