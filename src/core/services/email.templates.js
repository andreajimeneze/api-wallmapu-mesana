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


        const data = await response.json();

        if (!response.ok) {
            throw new Error(JSON.stringify(data));
        }

        return data;

    } catch (error) {

        console.error(
            `Error sending email to ${to}`,
            error
        );

        return null;
    }
};

const formatDate = (date) => {
    return new Date(date)
        .toLocaleDateString("es-CL");
};


// --------------------------------------------------
// WELCOME EMAIL
// --------------------------------------------------

export const sendWelcomeEmail = async (data) => {
    const html = `
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        
            <div style="max-width: 600px; margin:0 auto; padding: 20px;">

                <h2 style="color: #4A148C;">
                    ¡Bienvenido/a a Biblioteca Wallmapu!
                </h2>

                <p style="color: #00897B;">
                    Hola ${data.name},
                </p>

                <h4>
                    Tu cuenta ha sido creada exitosamente.
                </h4>

                <div style="
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                ">
                <p>
                    Desde ahora podrás:
                </p>
                    <p>✅ Reservar libros</p>
                    <p>✅ Solicitar préstamos</p>
                    <p>✅ Recibir notificaciones</p>
                    <div>
                         <h4 style="color: #4A148C;">
                            Recuerda que cuando vayas por tu primer libro deberás llevar:
                        </h4>
                        <p>✅ Carné de identidad</p>
                        <p>✅ Comprobante de domicilio (boleta de servicios básicos o certificado de residencia)</p>
                    </div>
                </div>

            </div>

        </body>
    </html>
    `;

    return await sendEmail(
        data.email,
        "¡Bienvenido/a a Biblioteca Wallmapu!",
        html
    );
};


// --------------------------------------------------
// ADMIN EMAIL
// --------------------------------------------------

export const sendAdminEmail = async (data) => {
    const name = data.name || data.user_name || data.email?.split("@")[0];
    const priorityBanner = data.isPriority
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
        data.email,
        subject,
        html
    );
};


// --------------------------------------------------
// RESERVATION CREATED
// --------------------------------------------------

export const sendReservationCreatedEmail = async (data) => {
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
                <h4 style="color: #4A148C;">
                   Los datos de tu libro son:
                </h4>
                    <p><strong>Reserva #:</strong> ${data.id}</p>
                    <p><strong>Libro:</strong> ${data.book_title}</p>
                    <p><strong>Código:</strong> ${data.book_barcode}</p>
                    <p><strong>Fecha máximo de retiro: </strong>${formatDate(data.expirationDate)}</p>
                </div>

            </div>

        </body>

    </html>
    `;

    return await sendEmail(
        data.email,
        `RESERVA CREADA - #${data.id}`,
        html
    );
};


// --------------------------------------------------
// RESERVATION CANCELLED
// --------------------------------------------------

export const sendReservationCancelledEmail = async (data) => {
    const html = `
    <html>

        <body style="font-family: Arial, sans-serif;">

            <div style="max-width: 600px; margin:0 auto; padding: 20px;">

                <h2 style="color: #D81B60;">
                    Reserva Cancelada del libro ${data.book_title}
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
        data.email,
        `RESERVA CANCELADA - #${data.id}`,
        html
    );
};


// --------------------------------------------------
// LOAN CREATED
// --------------------------------------------------

export const sendLoanCreatedEmail = async (data) => {
    const html = `
    <html>

        <body style="font-family: Arial, sans-serif;">

            <div style="max-width: 600px; margin:0 auto; padding: 20px;">

                <h2 style="color: #4A148C;">
                    ¡Felicitaciones, has retirado el libro ${data.book_title}! ¡Disfrútalo!
                </h2>

                <div style="
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                ">
                    <p><strong>Préstamo #:</strong> ${data.id}</p>
                    <p><strong>Libro:</strong> ${data.book_title}</p>
                    <p><strong>Código:</strong> ${data.book_barcode}</p>
                    <p><strong>La fecha de devolución del libro es:</strong> ${formatDate(data.expirationDate)}</p>
                </div>

            </div>

        </body>

    </html>
    `;

    return await sendEmail(
        data.email,
        `PRÉSTAMO REALIZADO - #${data.id}`,
        html
    );
};


// --------------------------------------------------
// LOAN RETURNED
// --------------------------------------------------

export const sendLoanReturnedEmail = async (data) => {
    const html = `
    <html>

        <body style="font-family: Arial, sans-serif;">

            <div style="max-width: 600px; margin:0 auto; padding: 20px;">

                <h2 style="color: #4A148C;">
                    ¡Has devuelto el libro ${data.book_title}!
                </h2>

                <div style="
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                ">
                    <p>
                        <strong>Préstamo #:</strong> ${data.id}
                    </p>

                    <p>
                        <strong>Libro:</strong> ${data.book_title}
                    </p>

                    <p>
                        <strong>Código:</strong> ${data.book_barcode}
                    </p>
                </div>
                 <h3 style="color: #4A148C;">
                    ¡Muchas gracias, te esperamos pronto!
                </h3>

            </div>

        </body>

    </html>
    `;

    return await sendEmail(
        data.email,
        `LIBRO DEVUELTO - #${data.id}`,
        html
    );
};


