import { conn } from '../../../libs/mysql';
import { NextResponse } from 'next/server';

export async function POST(req) {
  if (req.method === 'POST') {
    const { nombre, telefono, correo, referencia_pago, imagen_comprobante, cartones, code } = await req.json(); // Utiliza req.json() para obtener los datos de la solicitud

    try {
      // Paso 1: Insertar cliente
      const clienteQuery = 'INSERT INTO clientes (nombre, telefono, correo) VALUES (?, ?, ?)';
      const clienteValues = [nombre, telefono, correo];
      const clienteResult = await conn.query(clienteQuery, clienteValues);
      const idCliente = clienteResult.insertId;

      // Paso 2: Insertar pago
      const pagoQuery = 'INSERT INTO pagos (id_cliente, monto, referencia_pago, imagen_comprobante) VALUES (?, ?, ?, ?)';
      const total = cartones.length * parseInt(process.env.NEXT_PUBLIC_PRECIO_POR_CARTON)
      const pagoValues = [idCliente, total, referencia_pago, imagen_comprobante];
      const pagoResult = await conn.query(pagoQuery, pagoValues);
      const idPago = pagoResult.insertId;

      // Paso 3: Insertar compras (cartones comprados)
      const compraPromises = cartones.map((idCarton) => {
        const compraQuery = 'INSERT INTO compras (id_pago, id_carton) VALUES (?, ?)';
        return conn.query(compraQuery, [idPago, idCarton]);
      });
      await Promise.all(compraPromises);

      // Paso 4: Actualizar el estado de los cartones a "pendiente confirmación"
      const actualizarCartonesPromises = cartones.map((idCarton) => {
        const updateCartonQuery = 'UPDATE cartones SET status = ? WHERE id_carton = ?';
        return conn.query(updateCartonQuery, ['pendiente confirmación', idCarton]);
      });
      await Promise.all(actualizarCartonesPromises);

      // Paso 5: Insartar los datos en la tabla sorteos si es necesario
      const sorteoQuery = 'INSERT INTO sorteo (nombre, codigo) VALUES (?, ?)';
      const sorteoValues = [nombre, code];
      const sorteoResult = await conn.query(sorteoQuery, sorteoValues);

      // Confirmación de éxito
      return NextResponse.json({ message: 'Compra realizada con éxito y cartones actualizados' }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Hubo un error al procesar la compra', error }, { status: 500 });
    }
  } else {
    // Solo aceptamos solicitudes POST
    return NextResponse.json({ message: 'Método no permitido' }, { status: 405 });
  }
}
