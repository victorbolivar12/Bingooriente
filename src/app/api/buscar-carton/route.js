import { conn } from '../../../libs/mysql';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Paso 1: Leer el cuerpo de la solicitud
    const { telefono } = await req.json();

    // Verificar si el número de teléfono está presente
    if (!telefono) {
      return NextResponse.json({ message: 'Número de teléfono es requerido' }, { status: 400 });
    }

    // Paso 2: Consultar los cartones asociados al cliente con el número de teléfono proporcionado
    const query = `
      SELECT ca.numero AS carton_numero, ca.status, ca.imagen_carton
      FROM clientes cl
      JOIN compras co ON cl.id_cliente = co.id_pago
      JOIN cartones ca ON co.id_carton = ca.id_carton
      WHERE cl.telefono = ?`;

    const cartones = await conn.query(query, [telefono]);

    // Paso 3: Verificar si se encontraron resultados
    if (cartones.length === 0) {
      return NextResponse.json({ message: 'No se encontraron cartones para el número de teléfono proporcionado' }, { status: 404 });
    }

    // Paso 4: Devolver los resultados
    return NextResponse.json({ cartones }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Hubo un error al recuperar los cartones', error }, { status: 500 });
  }
}
