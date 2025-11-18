import { conn } from '../../../libs/mysql';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Obtenemos configuración
    const [config] = await conn.query(
      'SELECT numero_cartones FROM configuracion LIMIT 1'
    );

    if (!config) {
      return NextResponse.json(
        { message: 'No existe configuración' },
        { status: 400 }
      );
    }

    const { numero_cartones } = config;

    // ----------------------------------------------------
    // 🔹 1. Borrar datos de las tablas relacionadas
    // ----------------------------------------------------
    // El orden importa por las FK: sorteo -> compras -> pagos/clientes
    await conn.query('DELETE FROM sorteo');
    await conn.query('DELETE FROM compras');
    await conn.query('DELETE FROM pagos');
    await conn.query('DELETE FROM clientes');

    // ----------------------------------------------------
    // 🔹 2. Resetear cartones (status = disponible, activo = 0)
    // ----------------------------------------------------
    await conn.query(
      'UPDATE cartones SET status = "disponible", activo = 0'
    );

    // ----------------------------------------------------
    // 🔹 3. Activar los primeros N cartones
    // ----------------------------------------------------
    await conn.query(
      'UPDATE cartones SET activo = 1 WHERE status = "disponible" LIMIT ?',
      [numero_cartones]
    );

    // ----------------------------------------------------
    // 🔹 4. Respuesta
    // ----------------------------------------------------
    return NextResponse.json(
      { message: `Sorteo iniciado con ${numero_cartones} cartones activos. Datos previos eliminados.` },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error al iniciar sorteo:', error);
    return NextResponse.json(
      { message: 'Error al iniciar el sorteo', error },
      { status: 500 }
    );
  }
}
