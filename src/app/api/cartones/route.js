import { conn } from '../../../libs/mysql';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Obtener el límite desde el archivo .env
    const limit = parseInt(process.env.LIMIT_CARTONES, 10) || 100; // Si no está definido, usa 100 por defecto

    // Consulta SQL con límite dinámico
    const query = 'SELECT * FROM cartones WHERE status = ? LIMIT ?';
    const cartones = await conn.query(query, ['disponible', limit]);

    if (cartones.length === 0) {
      return NextResponse.json({ message: 'No se encontraron cartones disponibles' }, { status: 404 });
    }

    return NextResponse.json({ cartones }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Hubo un error al recuperar los cartones', error }, { status: 500 });
  }
}