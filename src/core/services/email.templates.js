import { env } from "../../config/env.js";

export const sendEmail = async (
    to,
    subject,
    html
) => {

    try {

        const response = await fetch(
            "https://api.brevo.com/v3/smtp/email",
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "api-key": env.brevo.api_key,
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    sender: {
                        email: env.brevo.from_email,
                        name: env.brevo.from_name
                    },
                    to: [
                        {
                            email: to
                        }
                    ],
                    subject,
                    htmlContent: html
                })
            }
        );

        return await response.json();

    } catch (error) {

        console.error(
            `Error sending email to ${to}`,
            error
        );

        return null;
    }
};


import { sendEmail } from "./email.service.js";

const formatDate = (date) => {

    return new Date(date)
        .toLocaleDateString("es-CL");
};


// --------------------------------------------------
// WELCOME EMAIL
// --------------------------------------------------

export const sendWelcomeEmail = async(data) => {

    const html = `
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        
            <div style="max-width: 600px; margin:0 auto; padding: 20px;">

                <h2 style="color: #4A148C;">
                    ¡Bienvenido/a a Biblioteca Wallmapu!
                </h2>

                <p style="color: #00897B;">
                    Hola ${data.user_name},
                </p>

                <p>
                    Tu cuenta ha sido creada exitosamente.
                </p>

                <div style="
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                ">
                    <p>✅ Reservar libros</p>
                    <p>✅ Solicitar préstamos</p>
                    <p>✅ Recibir notificaciones</p>
                </div>

            </div>

        </body>
    </html>
    `;

    return await sendEmail(
        data.user_email,
        "¡Bienvenido/a a Biblioteca Wallmapu!",
        html
    );
};


// --------------------------------------------------
// ADMIN EMAIL
// --------------------------------------------------

export const sendAdminEmail = async(data) => {

    const priorityBanner = data.is_priority
        ? `
        <div style="
            background: #D32F2F;
            color: white;
            padding: 12px;
            border-radius: 5px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: bold;
        ">
            ⚠️ MENSAJE DE ALTA PRIORIDAD ⚠️
        </div>
        `
        : "";

    const html = `
    <html>

        <body style="font-family: Arial, sans-serif;">

            <div style="max-width: 600px; margin:0 auto; padding: 20px;">

                ${priorityBanner}

                <h2 style="
                    color: ${data.is_priority ? "#D32F2F" : "#4A148C"};
                ">
                    ${data.title}
                </h2>

                <div style="
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                ">

                    <p style="white-space: pre-line;">
                        ${data.message}
                    </p>

                </div>

            </div>

        </body>

    </html>
    `;

    const subject = data.is_priority
        ? `[IMPORTANTE] ${data.title}`
        : data.title;

    return await sendEmail(
        data.user_email,
        subject,
        html
    );
};


// --------------------------------------------------
// RESERVATION CREATED
// --------------------------------------------------

export const sendReservationCreatedEmail = async(data) => {

    const html = `
    <html>

        <body style="font-family: Arial, sans-serif;">

            <div style="max-width: 600px; margin:0 auto; padding: 20px;">

                <h2 style="color: #4A148C;">
                    Reserva Creada Exitosamente
                </h2>

                <div style="
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                ">
                    <p><strong>Reserva #:</strong> ${data.id}</p>
                    <p><strong>Libro:</strong> ${data.book_title}</p>
                    <p><strong>CodBarra:</strong> ${data.book_barcode}</p>
                    <p><strong>Vence:</strong> ${formatDate(data.expiration_date)}</p>
                </div>

            </div>

        </body>

    </html>
    `;

    return await sendEmail(
        data.user_email,
        `RESERVA CREADA - #${data.id}`,
        html
    );
};


// --------------------------------------------------
// RESERVATION CANCELLED
// --------------------------------------------------

export const sendReservationCancelledEmail = async(data) => {

    const html = `
    <html>

        <body style="font-family: Arial, sans-serif;">

            <div style="max-width: 600px; margin:0 auto; padding: 20px;">

                <h2 style="color: #D81B60;">
                    Reserva Cancelada
                </h2>

                <div style="
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                ">
                    <p><strong>Reserva #:</strong> ${data.id}</p>
                    <p><strong>Libro:</strong> ${data.book_title}</p>
                    <p><strong>CodBarra:</strong> ${data.book_barcode}</p>
                </div>

            </div>

        </body>

    </html>
    `;

    return await sendEmail(
        data.user_email,
        `RESERVA CANCELADA - #${data.id}`,
        html
    );
};


// --------------------------------------------------
// LOAN CREATED
// --------------------------------------------------

export const sendLoanCreatedEmail = async(data) => {

    const html = `
    <html>

        <body style="font-family: Arial, sans-serif;">

            <div style="max-width: 600px; margin:0 auto; padding: 20px;">

                <h2 style="color: #4A148C;">
                    ¡Tu préstamo se ha realizado!
                </h2>

                <div style="
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                ">
                    <p><strong>Préstamo #:</strong> ${data.id}</p>
                    <p><strong>Libro:</strong> ${data.book_title}</p>
                    <p><strong>CodBarra:</strong> ${data.book_barcode}</p>
                    <p><strong>Devolución:</strong> ${formatDate(data.expiration_date)}</p>
                </div>

            </div>

        </body>

    </html>
    `;

    return await sendEmail(
        data.user_email,
        `PRÉSTAMO REALIZADO - #${data.id}`,
        html
    );
};


// --------------------------------------------------
// LOAN RETURNED
// --------------------------------------------------

export const sendLoanReturnedEmail = async(data) => {

    const html = `
    <html>

        <body style="font-family: Arial, sans-serif;">

            <div style="max-width: 600px; margin:0 auto; padding: 20px;">

                <h2 style="color: #4A148C;">
                    ¡Tu préstamo ha sido devuelto!
                </h2>

                <div style="
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                ">
                    <p>
                        <strong>Préstamo #:</strong>
                        ${data.id}
                    </p>

                    <p>
                        <strong>Libro:</strong>
                        ${data.book_title}
                    </p>

                    <p>
                        <strong>CodBarra:</strong>
                        ${data.book_barcode}
                    </p>
                </div>

            </div>

        </body>

    </html>
    `;

    return await sendEmail(
        data.user_email,
        `PRÉSTAMO DEVUELTO - #${data.id}`,
        html
    );
};


