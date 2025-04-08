import { conn } from '../../../libs/mysql';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const cartones = searchParams.get('cartones');

    if (!cartones) {
      return NextResponse.json({ message: 'No se encontraron cartones para este pago' }, { status: 400 });
    }

    // Convertir el string de cartones en un array
    const cartonesArray = cartones.split(',').map(id => id.trim()); // Eliminar espacios en blanco

    console.log(cartonesArray); // Verificar que se convierten correctamente

    // Actualizar el estado de los cartones a "ocupados"
    const actualizarCartonesPromises = cartonesArray.map((id_carton) => {
      const updateCartonQuery = 'UPDATE cartones SET status = ? WHERE id_carton = ?';
      return conn.query(updateCartonQuery, ['ocupados', id_carton]);
    });

    await Promise.all(actualizarCartonesPromises);

    // Redirigir a una página de confirmación
    return NextResponse.json({ message: 'Pago confirmado con exito'}, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al confirmar el pago', error }, { status: 500 });
  }
}
