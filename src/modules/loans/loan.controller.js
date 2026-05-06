import { internalServerResponse, notFoundResponse, succesGetResponse, successCreateResponse, successUpdateResponse } from "../../core/responses/apiResponse.js";
import { createLoanDTO, loanBasicResponseDTO, loanResponseDTO } from "./loan.dto.js";
import { createLoanService, getActiveLoanByBarcodeService, getActiveLoansByBookIdService, getActiveLoansByCopyIdService, getActiveLoansByUserIdService, getAllLoansService, getLoanByIdService, getLoansAndSearchForUserService, getLoansAndSearchService, getLoansOverDueService, markLoanAsExpireOverdueService, returnLoanByCopyIdService } from './loan.service.js';

export const getLoansPaginationAndSearch = async (req, res) => {
      try {
        let page = parseInt(req.query.page ?? 1);
        let items = parseInt(req.query.items ?? 10);
        const id_status = parseInt(req.query.id_status);
    
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
          status: id_status
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
    
        if (isNaN(page) || page < 1 || isNaN(items) || items < 1) {
          return res.status(400).json(
            badRequestResponse({
              message: "El número de página o items debe ser mayor a 0",
            }),
          );
        }
    
        const result = await getLoansAndSearchForUserService({
          page,
          limit: items,
          search: req.query.search ?? "",
          status: id_status,
          userId: userId
        });

        if(!result || result.length === 0) {
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
        const activeLoans = await getActiveLoansByUserIdService(userId);

        if (activeLoans.length === 0) {
            return res.status(200).json(succesGetResponse({ message: 'No existen préstamos activos para el usuario'}));
        };

        return res.status(200).json(succesGetResponse({ message: 'Préstamos activos obtenidos correctamente', data: activeLoans.map(loanResponseDTO) }))

    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener los préstamos por usuario' }));
    };
};

export const getActiveLoansByCopyId = async (req, res) => {
    const {copyId} = req.params;

    try {
         const activeLoan = await getActiveLoansByCopyIdService(copyId);

        if (!activeLoan) {
            return res.status(404).json(notFoundResponse({ message: 'No existen copias con préstamos activo' }));
        };

        return res.status(200).json(succesGetResponse({ message: 'Copias con préstamos activos obtenidos correctamente', data: loanResponseDTO(activeLoan) }))


    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener las copias con préstamos por usuario' }));
    };
};

export const getActiveLoansByBookId = async (req, res) => {
    const {bookId} = req.params;

    try {
         const activeLoansByBook = await getActiveLoansByBookIdService(bookId);

        if (activeLoansByBook.length === 0) {
            return res.status(200).json(succesGetResponse({ message: 'No existen libros con préstamos activos' }));
        };

        return res.status(200).json(succesGetResponse({ message: 'Libros con préstamos activos obtenidos correctamente', data: activeLoansByBook.map(loanBasicResponseDTO) }))


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

        return res.status(200).json(succesGetResponse({ message: 'Préstamos vencidos obtenidos correctamente', data: overDueLoans.map(loanBasicResponseDTO) }))

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
        return res.status(error.status || 500).json(error.message || 'Error al intentar obtener los préstamos vencidos' );
    };
};

export const returnLoan = async (req, res) => {
    const { copyId } = req.params;

    try {
        const returnedLoan = await returnLoanByCopyIdService(copyId);

        return res.status(202).json(successUpdateResponse({message: 'Ejemplar devuelto con éxito', data: loanResponseDTO(returnedLoan)}));
    } catch(error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({message: 'Error al intentar actualizar el estado del ejemplar'}));
    }
}; 

export const markLoanAsExpireOverdue = async (req, res) => {
    try {
        const markedAsExpireOverdue = await markLoanAsExpireOverdueService();

        return res.status(202).json(successUpdateResponse({message: 'Préstamo vencido actualizado con éxito', data: markedAsExpireOverdue}));
    } catch(error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({message: 'Error al intentar actualizar el vencimiento del ejemplar'}));
    }
};

export const getActiveLoanByBarcode = async (req, res) => {
  
    const { barcode } = req.params;
    
    try {
        const loan = await getActiveLoanByBarcodeService(barcode);
        
        if(!loan || loan.length === 0) {
            return res.status(404).json(notFoundResponse({message: 'Préstamo no encontrado'}))
        }
        return res.status(200).json(succesGetResponse({message: 'Préstamo obtenido con éxito', data: loanBasicResponseDTO(loan)}));
    } catch(error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({message: 'Error al intentar obtener el préstamo'}));
    }
}