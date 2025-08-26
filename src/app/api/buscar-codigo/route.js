import { conn } from "../../../libs/mysql"; // Conexión a la base de datos
import { NextResponse } from "next/server";

// Endpoint para obtener información completa de un sorteo por código
export async function POST(req) {
  try {
    const { codigoSorteo } = await req.json(); // Recibimos el código del sorteo

    // Validación
    if (!codigoSorteo) {
      return NextResponse.json(
        { message: "El código de sorteo es requerido" },
        { status: 400 }
      );
    }

    // Consulta SQL
    const query = `
      SELECT 
          s.id_sorteo,
          s.codigo,
          s.signo,
          c.numero AS numero_carton,
          p.monto,
          cl.nombre AS nombre_cliente,
          cl.telefono AS telefono_cliente
      FROM sorteo s
      INNER JOIN compras co ON s.id_compra = co.id_compra
      INNER JOIN cartones c ON co.id_carton = c.id_carton
      INNER JOIN pagos p ON co.id_pago = p.id_pago
      INNER JOIN clientes cl ON p.id_cliente = cl.id_cliente
      WHERE s.codigo = ?
    `;

    // Ejecutamos la consulta con el código del sorteo
    const [result] = await conn.query(query, [codigoSorteo]);

    // Verificamos si se encontró información
    if (result.length === 0) {
      return NextResponse.json(
        { message: "No se encontró información para ese código de sorteo" },
        { status: 404 }
      );
    }

    // Devolvemos los datos encontrados
    return NextResponse.json({ result }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Hubo un error al recuperar la información del sorteo", error },
      { status: 500 }
    );
  }
}
