import { conn } from "../../../libs/mysql"; // Importar la conexión a la base de datos
import { NextResponse } from "next/server";

// Endpoint para obtener la información del cliente por número de cartón
export async function POST(req) {
  try {

    const { numeroCarton } = await req.json(); // Recibimos el número de cartón en el body de la solicitud

    // Verificamos si el número de cartón fue enviado
    if (!numeroCarton) {
      return NextResponse.json({ message: "El número de cartón es requerido" }, { status: 400 });
    }

    // Consulta SQL para obtener la información del cliente
    const query = `
      SELECT c.id_cliente, c.nombre, c.telefono, c.correo
      FROM cartones ca
      JOIN compras co ON ca.id_carton = co.id_carton
      JOIN clientes c ON co.id_pago = c.id_cliente
      WHERE ca.numero = ?
    `;

    // Ejecutamos la consulta con el número del cartón
    const [result] = await conn.query(query, [numeroCarton]);

    // Verificamos si se encontró un cliente asociado al cartón
    if (result.length === 0) {
      return NextResponse.json({ message: "No se encontró un cliente asociado a ese número de cartón" }, { status: 404 });
    }

    // Devolvemos los datos del cliente
    return NextResponse.json({ result }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Hubo un error al recuperar la información del cliente", error }, { status: 500 });
  }
}
