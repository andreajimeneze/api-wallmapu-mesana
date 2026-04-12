import { internalServerResponse, notFoundResponse, succesGetResponse } from "../../shared/apiResponse.js";
import { loanStatusDTO } from "./loan_status.dto.js";
import { getAllLoanStatusService } from "./loan_status.service.js";

export const getAllLoanStatus = async (req , res) => {
    try {
        const allLoanStatus = await getAllLoanStatusService();

        if(allLoanStatus.length === 0) {
            return res.status(404).json(notFoundResponse({message: 'No existen estados de préstamos cargados'}));
        };

        return res.status(200).json(succesGetResponse({message: 'Estados de préstamos cargados con éxito', result: allLoanStatus.map(loanStatusDTO)}))

    } catch(error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({message: 'Error al intentar obtener los estados de préstamos'}));
    }
}