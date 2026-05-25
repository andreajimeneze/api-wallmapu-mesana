import { findLoanByIdRepository } from "../../../modules/loans/loan.repository.js";
import { findUserByIdRepository } from "../../../modules/users/user.repository.js";
import { sendToUser } from "../../lib/socketManager.js";
import { sendLoanCreatedEmail, sendLoanReturnedEmail } from "../../services/email.templates.js";
import { eventEmitter } from "../eventEmitter.js";

eventEmitter.on('CREATED_LOAN', async (loan) => {
    sendToUser(loan.userId, 'notification', {
        type: 'created_loan',
        data: loan
    });

    const user = await findUserByIdRepository(loan.userId);
    const fullLoan = await findLoanByIdRepository(loan.idLoan);

    await sendLoanCreatedEmail({
        email: user.email,
        id: fullLoan.idLoan,
        book_title: fullLoan.copy.edition.book.title,
        book_barcode: fullLoan.copy.barcode,
        expiration_date: fullLoan.expirationDate
    });
})

eventEmitter.on('RETURN_LOAN', async (loan) => {
    sendToUser(loan.userId, 'notification', {
        type: 'return_loan',
        data: loan
    })

    const currentLoan = loan[0].dataValues;

    const user = await findUserByIdRepository(currentLoan.userId);
    const fullLoan = await findLoanByIdRepository(currentLoan.idLoan)

    await sendLoanReturnedEmail({
        email: user.email,
        id: fullLoan.idLoan,
        book_title: fullLoan.copy.edition.book.title,
        book_barcode: fullLoan.copy.barcode
    });
})