import { conflictResponse, internalServerResponse, notFoundResponse, succesGetResponse, successCreateResponse, successUpdateResponse } from "../../core/responses/apiResponse.js";
import { createLoanDTO, loanBasicResponseDTO, loanResponseDTO, loanWhereRequestDTO } from "./loan.dto.js";
import { createLoanService, getActiveLoanByBarcodeService, getLoansAndSearchService, getLoansOverDueService, markLoanAsExpireOverdueService, returnLoanByCopyIdService } from './loan.service.js';

export const getLoansPaginationAndSearch = async (req, res) => {
    try {
        let page = parseInt(req.query.page ?? 1);
        let items = parseInt(req.query.items ?? 10);


        const { idLoanStatus } = loanWhereRequestDTO({
            id_status: req.query.id_status
        });


        if (isNaN(page) || page < 1 || isNaN(items) || items < 1) {
            return res.status(400).json(
                badRequestResponse({
                    message: "El número de página o items debe ser mayor a 0",
                }),
            );
        }

        const result = await getLoansAndSearchService({
            page,
            limit: items,
            search: req.query.search ?? "",
            filter: { idLoanStatus }
        });

        return res.status(200).json(
            succesGetResponse({
                message: "Préstamos obtenidos exitosamente",
                data: result.data,
            }),
        );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(internalServerResponse({ message: "Error al obtener los préstamos" }));
    }
};
export const getLoansPaginationAndSearchForUser = async (req, res) => {
    try {
        let page = parseInt(req.query.page ?? 1);
        let items = parseInt(req.query.items ?? 10);
        const id_status = parseInt(req.query.id_status);
        const userId = req.user.sub;


        const { idLoanStatus } = loanWhereRequestDTO({
            id_status: req.query.id_status
        });

        if (isNaN(page) || page < 1 || isNaN(items) || items < 1) {
            return res.status(400).json(
                badRequestResponse({
                    message: "El número de página o items debe ser mayor a 0",
                }),
            );
        }

        const result = await getLoansAndSearchService({
            page,
            limit: items,
            search: req.query.search ?? "",
            filter: {
                idLoanStatus,
                userId
            }
        });

        if (!result || result.length === 0) {
            return res.status(200).json(
                succesGetResponse({
                    message: "No existen préstamos actualmente"
                }),
            );
        }

        return res.status(200).json(
            succesGetResponse({
                message: "Préstamos obtenidos exitosamente",
                data: result.data,
            }),
        );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(internalServerResponse({ message: "Error al obtener los préstamos" }));
    }
};
export const getLoansOverDue = async (req, res) => {
    console.log('Ruta getLoansOverDue')
    try {
        const overDueLoans = await getLoansOverDueService();

        return res.status(200).json(succesGetResponse({ message: 'Préstamos vencidos obtenidos correctamente', data: overDueLoans.map(loanBasicResponseDTO) }))

    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener los préstamos vencidos' }));
    };
};
export const createLoan = async (req, res) => {
    const data = req.body;
    const loanDto = createLoanDTO(data);
    console.log('Ruta createLoan')
    try {
        await createLoanService(loanDto);

        return res.status(201).json(successCreateResponse({ resource: 'Loan' }));
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json(error.message || 'Error al intentar obtener los préstamos vencidos');
    };
};
export const returnLoan = async (req, res) => {
    const { copyId } = req.params;
    console.log('Ruta returnLoan')
    try {
        const returnedLoan = await returnLoanByCopyIdService(copyId);

        return res.status(202).json(successUpdateResponse({ message: 'Ejemplar devuelto con éxito', data: returnedLoan }));
    } catch (error) {
        console.error(error);
        if (error.status === 404) {
            return res.status(404).json(notFoundResponse({ message: error.message }));
        }
        if (error.status === 409) {
            return res.status(409).json(conflictResponse({ message: error.message }));
        }
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar actualizar el estado del ejemplar' }));
    }
};
export const markLoanAsExpireOverdue = async (req, res) => {
    console.log('Ruta markLoanAsExpireOverdue')
    try {
        const markedAsExpireOverdue = await markLoanAsExpireOverdueService();

        return res.status(202).json(successUpdateResponse({ message: 'Préstamo vencido actualizado con éxito', data: markedAsExpireOverdue }));
    } catch (error) {
        console.error(error);
        if (error.status === 404) {
            return res.status(404).json(notFoundResponse({ message: error.message }));
        }
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar actualizar el vencimiento del ejemplar' }));
    }
};
export const getActiveLoanByBarcode = async (req, res) => {
    const { barcode } = req.params;
    console.log('Ruta getActiveLoanByBarcode')
    try {
        const loan = await getActiveLoanByBarcodeService(barcode);

        return res.status(200).json(succesGetResponse({ message: 'Préstamo obtenido con éxito', data: loanBasicResponseDTO(loan) }));
    } catch (error) {
        console.error(error);
        if (error.status === 404) {
            return res.status(404).json(notFoundResponse({ message: error.message }));
        }
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener el préstamo' }));
    }
}