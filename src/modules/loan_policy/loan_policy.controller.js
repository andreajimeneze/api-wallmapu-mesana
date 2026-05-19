import { internalServerResponse, notFoundResponse, succesGetResponse, successCreateResponse, successDeleteResponse, successUpdateResponse } from "../../core/responses/apiResponse.js"
import { baseLoanPolicyDTO } from "./loan_policy.dto.js";
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
