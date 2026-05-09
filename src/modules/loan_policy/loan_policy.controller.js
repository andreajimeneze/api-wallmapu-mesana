import { internalServerResponse, notFoundResponse, succesGetResponse, successCreateResponse, successDeleteResponse, successUpdateResponse } from "../../core/responses/apiResponse.js"
import { baseLoanPolicyDTO, createLoanPolicyDTO, updateLoanPolicyDTO } from "./loan_policy.dto.js";
import { getDefaultPolicyService } from "./loan_policy.service.js"


export const getDefaultPolicy = async (req, res) => {
    try {

        const defaultPolicy = await getDefaultPolicyService();

        return res.status(200).json(succesGetResponse({ resource: 'Política de préstamos', data: baseLoanPolicyDTO(defaultPolicy) }));
    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({
            message: 'Error al intentar obtener la política de préstamos por defecto'
        }));
    };
}

export const updateLoanPolicy = async (req, res) => {
    const { id } = req.params;
    const dataPolicy = req.body;

    const policyDto = updateLoanPolicyDTO(dataPolicy);

    try {
        const updatedPolicy = await updateLoanPolicy(id, policyDto);

        return res.status(202).json(successUpdateResponse({ message: 'Política de préstamos actualizada con éxito', data: updatedPolicy }));

    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({
            message: 'Error al intentar actualizar la política de préstamo'
        }));
    };
};