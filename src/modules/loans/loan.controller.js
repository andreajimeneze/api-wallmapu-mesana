import { internalServerResponse, notFoundResponse, succesGetResponse, successCreateResponse } from "../../core/responses/apiResponse.js";
import { createLoanDTO, loanResponseDTO } from "./loan.dto.js";
import { createLoanService, getActiveLoansByBookIdService, getActiveLoansByCopyIdService, getActiveLoansByUserIdService, getAllLoansService, getLoanByIdService, getLoansOverDueService } from './loan.service.js';

export const getAllLoans = async (req, res) => {
    try {
        const allLoans = await getAllLoansService();

        if (allLoans.length === 0) {
            return res.status(200).json(succesGetResponse({ resource: 'Préstamos' }));
        };

        return res.status(200).json(succesGetResponse({ resource: 'Préstamos', data: allLoans.map(loanResponseDTO) }))
    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener los préstamos' }));
    };
};

export const getLoanById = async (req, res) => {
    const { id } = req.params;

    try {
        const loan = await getLoanByIdService(id);

        if (!loan) {
            return res.status(404).json(notFoundResponse({ message: 'No existe préstamo solicitado' }));
        };

        return res.status(200).json(succesGetResponse({ message: 'Préstamos obtenidos con éxito', data: loanResponseDTO(loan) }))

    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener los préstamos' }));
    };
};

export const getActiveLoansByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const activeLoans = getActiveLoansByUserIdService(userId);

        if (activeLoans.length === 0) {
            return res.status(200).json(succesGetResponse({ message: 'No existen préstamos activos para el usuario' }));
        };

        return res.status(200).json(succesGetResponse({ message: 'Préstamos activos obtenidos correctamente', data: loanResponseDTO(activeLoans) }))

    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener los préstamos por usuario' }));
    };
};

export const getActiveLoansByCopyId = async (req, res) => {
    const {copyId} = req.params;

    try {
         const activeLoans = getActiveLoansByCopyIdService(copyId);

        if (activeLoans.length === 0) {
            return res.status(404).json(notFoundResponse({ message: 'No existen copias con préstamos activo' }));
        };

        return res.status(200).json(succesGetResponse({ message: 'Copias con préstamos activos obtenidos correctamente', data: loanResponseDTO(activeLoans) }))


    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener las copias con préstamos por usuario' }));
    };
};

export const getActiveLoansByBookId = async (req, res) => {
    const {bookId} = req.params;

    try {
         const activeLoansByBook = getActiveLoansByBookIdService(copyId);

        if (activeLoansByBook.length === 0) {
            return res.status(200).json(succesGetResponse({ message: 'No existen libros con préstamos activos' }));
        };

        return res.status(200).json(succesGetResponse({ message: 'Libros con préstamos activos obtenidos correctamente', data: loanResponseDTO(activeLoansByBook) }))


    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener los libros con préstamos activos' }));
    };
};

export const getLoansOverDue = async (req, res) => {
    try {
        const overDueLoans = await getLoansOverDueService();

        if(overDueLoans.length === 0) {
            return res.status(200).json(succesGetResponse({ message: 'No existen préstamos vencidos' }));
        };

        return res.status(200).json(succesGetResponse({ message: 'Préstamos vencidos obtenidos correctamente', data: overDueLoans.map(loanResponseDTO) }))

    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener los préstamos vencidos' }));
    };
};

export const createLoan = async (req, res) => {
    const data = req.body;
    const loanDto = createLoanDTO(data);

    try {

        await createLoanService(loanDto);

        return res.status(201).json(successCreateResponse({resource: 'Loan'}));
    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener los préstamos vencidos' }));
    };
};