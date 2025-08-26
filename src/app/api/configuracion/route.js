import { conn } from '../../../libs/mysql';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await conn.query('SELECT * FROM configuracion LIMIT 1');
    
    // Cierra la conexión si ya no se usará (opcional pero recomendable)
    await conn.end();

    if (result.length === 0) {
      return NextResponse.json({ message: 'No se encontró configuración' }, { status: 404 });
    }

    return NextResponse.json(result[0], { status: 200 });
  } catch (error) {
    console.error('Error al obtener configuración:', error);
    return NextResponse.json({ message: 'Error del servidor', error: error.message }, { status: 500 });
  }
}
