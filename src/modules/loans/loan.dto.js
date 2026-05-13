export const loanResponseDTO = (res) => ({
    id_loan: res.idLoan,
    user_id: res.userId,
    copy_id: res.copyId,
    loan_date: res.loanDate,
    due_date: res.dueDate,
    return_date: res.returnDate,
    loan_status_id: res.loan,
    created_at: res.createdAt,
    updated_at: res.updatedAt
});

export const createLoanDTO = ({
    user_id,
    copy_id,
    loan_date,
    due_date,
    return_date,
    status
}) => {
    return {
        userId: user_id,
        copyId: copy_id,
        loanDate: loan_date,
        dueDate: due_date,
        returnDate: return_date,
        status: status
    }
};

export const updateLoanDTO = (loanData) => {
    const dto = {};

    if(loanData.loan_date != undefined) {
        dto.loanDate = loanData.loan_date
    };

    if(loanData.due_date != undefined) {
        dto.dueDate = loanData.due_date
    };

    if(loanData.return_date != undefined) {
        dto.returnDate = loanData.return_date
    };

    if(loanData.user_id != undefined) {
        dto.userId = loanData.user_id
    };

    if(loanData.copy_id != undefined) {
        dto.copyId = loanData.copy_id
    };

    if(loanData.status != undefined) {
        dto.status = loanData.status
    };

    return dto;
};

export const loanBasicResponseDTO = (res) => ({
  id_loan: res.idLoan,
  loan_date: res.loanDate,
  due_date: res.dueDate,
  return_date: res.returnDate,
  loan_status_id: res.loanStatusId,
  loan_status_name: res.loanStatus.name,
  user_id: res.userId,
  user_name: res.user.username + " " + res.user.userlastname,
  copy_id: res.copyId,
  copy_barcode: res.copy.barcode,
  copy_signature: res.copy.signatureTopography,
  book_id: res.copy.edition.bookId,
  book_title: res.copy.edition.book.title,
});

export const loanWhereRequestDTO = ({ id_status } = {}) => {
  const idLoanStatus = Number(id_status);

  return {
    ...(idLoanStatus > 0 && { idLoanStatus })
  };
};
