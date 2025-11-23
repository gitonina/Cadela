 import { Calendar, MapPin, Mountain, Gauge } from 'lucide-react';

const RaceCard = ({ race, isOpen, isPast }) => {
  return (
    <div className={`relative bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg ${isPast ? 'opacity-80' : ''}`}>
      {/* Badge de estado */}
      {isOpen && (
        <div className="absolute top-3 left-3 z-10 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
          Inscripciones Abiertas
        </div>
      )}
      {isPast && (
        <div className="absolute top-3 left-3 z-10 bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Finalizada
        </div>
      )}

      <div className="flex flex-col md:flex-row">
        {/* Imagen del circuito */}
        <div className="md:w-1/3 h-48 md:h-auto">
          <img
            src={race.image}
            alt={`Circuito ${race.name}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenido */}
        <div className="md:w-2/3 p-6 flex flex-col justify-between">
          <div>
            {/* Fecha */}
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="font-medium">Domingo {race.date}</span>
            </div>

            {/* Nombre de la carrera */}
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {race.name}
            </h3>

            {/* Ubicación */}
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{race.location}</span>
            </div>

            {/* Distancia y Desnivel */}
            <div className="flex gap-6 mb-4">
              <div className="flex items-center">
                <Gauge className="w-5 h-5 mr-2 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{race.distance}</div>
                  <div className="text-xs text-gray-500">Distancia</div>
                </div>
              </div>
              <div className="flex items-center">
                <Mountain className="w-5 h-5 mr-2 text-red-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{race.elevation}</div>
                  <div className="text-xs text-gray-500">Desnivel</div>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Ver detalles
            </button>
            {isOpen && (
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md">
                Inscribirse ahora
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState('marzo');

  // Datos de ejemplo
  const races = {
    marzo: [
      {
        id: 1,
        date: '2 de Marzo',
        name: 'Ruta de la Costa',
        location: 'Valparaíso, Chile',
        distance: '80km',
        elevation: '1,200m',
        image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80',
        status: 'past'
      },
      {
        id: 2,
        date: '9 de Marzo',
        name: 'Desafío Andino',
        location: 'Cajón del Maipo, Chile',
        distance: '95km',
        elevation: '2,100m',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80',
        status: 'open'
      },
      {
        id: 3,
        date: '23 de Marzo',
        name: 'Gran Fondo del Valle',
        location: 'Colchagua, Chile',
        distance: '120km',
        elevation: '1,800m',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        status: 'upcoming'
      }
    ],
    abril: [
      {
        id: 4,
        date: '6 de Abril',
        name: 'Circuito Lago Rapel',
        location: 'Rapel, Chile',
        distance: '75km',
        elevation: '900m',
        image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80',
        status: 'upcoming'
      },
      {
        id: 5,
        date: '20 de Abril',
        name: 'Ruta de los Viñedos',
        location: 'Casablanca, Chile',
        distance: '65km',
        elevation: '750m',
        image: 'https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?w=800&q=80',
        status: 'upcoming'
      }
    ],
    mayo: [
      {
        id: 6,
        date: '4 de Mayo',
        name: 'Desafío Cordillerano',
        location: 'Farellones, Chile',
        distance: '110km',
        elevation: '2,500m',
        image: 'https://images.unsplash.com/photo-1563804236556-5e0b29c1eb1c?w=800&q=80',
        status: 'upcoming'
      }
    ]
  };

  const months = [
    { value: 'marzo', label: 'Marzo 2025' },
    { value: 'abril', label: 'Abril 2025' },
    { value: 'mayo', label: 'Mayo 2025' }
  ];

  const currentRaces = races[selectedMonth] || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 via-blue-300 to-blue-500">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Calendario de Carreras 2025
          </h1>
          <p className="text-white text-opacity-90">
            Selecciona un mes para ver las carreras disponibles
          </p>
        </div>

        {/* Selector de mes */}
        <div className="mb-8">
          <label htmlFor="month-select" className="block text-sm font-medium text-white mb-2">
            Seleccionar mes
          </label>
          <select
            id="month-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full md:w-64 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-gray-900 font-medium"
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>

        {/* Lista de carreras */}
        <div className="space-y-6">
          {currentRaces.length > 0 ? (
            currentRaces.map((race) => (
              <RaceCard
                key={race.id}
                race={race}
                isOpen={race.status === 'open'}
                isPast={race.status === 'past'}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500 text-lg">
                No hay carreras programadas para este mes
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;