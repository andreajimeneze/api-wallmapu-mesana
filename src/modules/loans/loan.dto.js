export const loanResponseDTO = (res) => ({
    id_loan: res.idLoan,
    user_id: res.userId,
    copy_id: res.copyId,
    loan_date: res.loanDate,
    due_date: res.dueDate,
    return_date: res.returnDate,
    status: res.status,
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

    if(loanData.loan_date === '') {
        dto.loanDate = loanData.loan_date
    };

    if(loanData.due_date === '') {
        dto.dueDate = loanData.due_date
    };

    if(loanData.return_date === '') {
        dto.returnDate = loanData.return_date
    };

    if(loanData.user_id === 0) {
        dto.userId = loanData.user_id
    };

    if(loanData.copy_id === 0) {
        dto.copyId = loanData.copy_id
    };

    if(loanData.status === '') {
        dto.status = loanData.status
    };

    return dto;
};