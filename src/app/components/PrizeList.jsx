"use client";

const PrizeList = () => {
  return (
    <section className="bg-[#14821f] text-white py-5 px-6 relative z-0">
      <div className="max-w-4xl mx-auto text-center">
        {/* Título */}
        <h2 className="text-3xl md:text-4xl font-bold mb-10">🎁 PREMIACIÓN 🎁</h2>

        <p className="text-lg md:text-xl mb-8 mt-8">
          Estos son los increíbles premios que puedes ganar participando en nuestro Bingo:
        </p>

        {/* Lista de premios */}
        <ul className="grid md:grid-cols-2 gap-4 text-left text-lg">
          <li className="bg-white/10 p-3 rounded-2xl">🏆 Televisor 4K de 55 pulgadas</li>
          <li className="bg-white/10 p-3 rounded-2xl">
            📱 Teléfono Celular Samsung Galaxy A06 
          </li>
          <li className="bg-white/10 p-3 rounded-2xl">💻 Tablet Digital</li>
          <li className="bg-white/10 p-3 rounded-2xl">🛴 Patineta eléctrica de 400 W</li>
          <li className="bg-white/10 p-3 rounded-2xl">🚴‍♂️ Bicicleta todo terreno</li>
          <li className="bg-white/10 p-3 rounded-2xl">🎮 PlayStation 5</li>
          <li className="bg-white/10 p-3 rounded-2xl">🧺 Lavadora automática de 14 kilos</li>
          <li className="bg-white/10 p-3 rounded-2xl">🥤 Licuadora</li>
          <li className="bg-white/10 p-3 rounded-2xl">🍰 Batidora</li>
          <li className="bg-white/10 p-3 rounded-2xl">🥪 Sandwichera</li>
          <li className="bg-white/10 p-3 rounded-2xl">🔥 Horno microondas</li>
          <li className="bg-white/10 p-3 rounded-2xl">📝 Noterinternacional Affa</li>
        </ul>
      </div>
    </section>
  );
};

export default PrizeList;
