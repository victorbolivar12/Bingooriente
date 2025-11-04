import { conn } from '../../../libs/mysql';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const query = 'SELECT * FROM cartones WHERE status = "disponible" LIMIT 600';
    const cartones = await conn.query(query);

    if (cartones.length === 0) {
      return NextResponse.json(
        { message: 'No se encontraron cartones disponibles' },
        { status: 404 }
      );
    }

    return NextResponse.json({ cartones }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Hubo un error al recuperar los cartones', error },
      { status: 500 }
    );
  }
}
