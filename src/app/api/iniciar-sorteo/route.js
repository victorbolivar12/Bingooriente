import { conn } from '../../../libs/mysql';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Obtener número de cartones desde configuración
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
    // 1️⃣ Borrar datos de las tablas relacionadas
    // El orden importa por las FK
    // ----------------------------------------------------
    await conn.query('DELETE FROM sorteo');
    await conn.query('DELETE FROM compras');
    await conn.query('DELETE FROM pagos');
    await conn.query('DELETE FROM clientes');

    // ----------------------------------------------------
    // 2️⃣ Resetear AUTO_INCREMENT
    // ----------------------------------------------------
    await conn.query('ALTER TABLE clientes AUTO_INCREMENT = 1');
    await conn.query('ALTER TABLE pagos AUTO_INCREMENT = 1');
    await conn.query('ALTER TABLE compras AUTO_INCREMENT = 1');
    await conn.query('ALTER TABLE sorteo AUTO_INCREMENT = 1');

    // ----------------------------------------------------
    // 3️⃣ Resetear cartones (status = disponible, activo = 0)
    // ----------------------------------------------------
    await conn.query('UPDATE cartones SET status = "disponible", activo = 0');

    // ----------------------------------------------------
    // 4️⃣ Activar los primeros N cartones según configuración
    // ----------------------------------------------------
    await conn.query(
      'UPDATE cartones SET activo = 1 WHERE status = "disponible" LIMIT ?',
      [numero_cartones]
    );

    // ----------------------------------------------------
    // 5️⃣ Respuesta
    // ----------------------------------------------------
    return NextResponse.json(
      {
        message: `Sorteo iniciado con ${numero_cartones} cartones activos. Datos antiguos eliminados y AUTO_INCREMENT reseteados.`,
      },
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
