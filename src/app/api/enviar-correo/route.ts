import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { conn } from '@/libs/mysql';


export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const nombre = formData.get('nombre') as string;
        const telefono = formData.get('telefono') as string;
        const correo = formData.get('correo') as string;
        const referencia_pago = formData.get('referencia_pago') as string;
        const cartonesString = formData.get('cartones') as string;
        const receiptFile = formData.get('receipt') as File | null;
        const codigoSorteo = formData.get('code') as string;
        const Signo = formData.get('signo') as string;

        const cartones = JSON.parse(cartonesString);
        const numeroCartones = cartones.length;
        const result = await conn.query('SELECT precio_carton FROM configuracion LIMIT 1') as { precio_carton: number }[];
        const precioPorCarton = result[0]?.precio_carton || 0;
        const monto = numeroCartones * precioPorCarton;


        let attachment = [];
        let imageCid = '';
        let imageSrc = '';

        if (receiptFile) {
            const fileBuffer = await receiptFile.arrayBuffer();

            imageCid = 'receiptImage';
            imageSrc = `cid:${imageCid}`;

            attachment = [{
                filename: receiptFile.name,
                content: Buffer.from(fileBuffer),
                cid: imageCid,
                contentType: receiptFile.type,
            }];
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

        const cartonesParam = encodeURIComponent(cartones.join(','));


        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_DESTINO,
            subject: 'Confirmación de compra',
            html: `
                <div style="text-align: center; padding: 20px;">
                    <h3 style="color: #333;">COMPRA REALIZADA CON ÉXITO</h3>
                </div>
                <div style="font-family: Arial, sans-serif; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
                    <p><strong>Nombre:</strong> ${nombre}</p>
                    <p><strong>Teléfono:</strong> ${telefono}</p>
                    <p><strong>Correo:</strong> ${correo}</p>
                    // <p><strong>Monto:</strong> $${monto}</p>
                    <p><strong>Referencia de pago:</strong> ${referencia_pago}</p>
                    <p><strong>Cartones comprados:</strong> ${cartones.join(', ')}</p>
                    ${receiptFile ? `<p><strong>Comprobante:</strong> <img src="${imageSrc}" alt="Comprobante" style="max-width: 300px;" /></p>` : '<p><strong>No se adjuntó comprobante</strong></p>'}
                    // <p><strong>Código de sorteo:</strong> ${codigoSorteo? codigoSorteo: "no participa"}</p>
                    // <p><strong>Signo del Zodiaco:</strong> ${Signo? Signo: "no participa"}</
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <a href="${baseUrl}/api/confirmar-pago?cartones=${cartonesParam}"
                        style="display: inline-block; background-color: #28a745; color: #fff; padding: 10px 20px;
                                font-size: 16px; text-decoration: none; border-radius: 5px;">
                        Confirmar Pago
                    </a>
                </div>
            `,
            attachments: attachment,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Correo enviado correctamente' }, { status: 200 });
    } catch (error) {
        console.error('Error enviando correo:', error);
        return NextResponse.json({ message: 'Error enviando correo', error }, { status: 500 });
    }
}