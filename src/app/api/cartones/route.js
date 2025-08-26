import { conn } from '../../../libs/mysql';
import { NextResponse } from 'next/server';

export async function GET() {
  try {

    const result = await conn.query('SELECT numero_cartones FROM configuracion LIMIT 1')
    const numero_cartones = result[0]?.numero_cartones || 0;

    // Consulta SQL con límite dinámico
    const query = 'SELECT * FROM cartones WHERE status = ? LIMIT ?';
    const cartones = await conn.query(query, ['disponible', numero_cartones]);

    if (cartones.length === 0) {
      return NextResponse.json({ message: 'No se encontraron cartones disponibles' }, { status: 404 });
    }

    return NextResponse.json({ cartones }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Hubo un error al recuperar los cartones', error }, { status: 500 });
  }
}