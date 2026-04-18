import { internalServerResponse, notFoundResponse, succesGetResponse, successCreateResponse, successDeleteResponse, successUpdateResponse } from "../../core/responses/apiResponse.js"
import { baseLoanPolicyDTO, createLoanPolicyDTO, updateLoanPolicyDTO } from "./loan_policy.dto.js";
import { deletePolicyService, getAllLoanPoliciesService, getLoanPolicyByIdService } from "./loan_policy.service.js"

export const getAllLoanPolicies = async ( req, res ) => {
    try {

        const loanPolicies = await getAllLoanPoliciesService();

        // if(loanPolicies.length === 0) {
        //     return res.status(404).json(notFoundResponse({resource: 'Políticas de préstamos'}));
        // };

        return res.status(200).json(succesGetResponse({resource: 'Políticas de préstamos', data: loanPolicies.map(baseLoanPolicyDTO)}));
    } catch(error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({
            message: 'Error al intentar obtener las políticas de préstamo'
        }));
    };
};

export const getPolicyById = async (req, res) => {
    const {id} = req.params;

    try {
        const selectedPolicy = await getLoanPolicyByIdService(id);

        if(!selectedPolicy) {
             return res.status(404).json(notFoundResponse({message: 'No existe la política de préstamo solicitada'}));
        };

        return res.status(200).json(succesGetResponse({message: 'Política de préstamo obtenida con éxito', data: baseLoanPolicyDTO(selectedPolicy)}));

    } catch(error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({
            message: 'Error al intentar obtener la política de préstamo solicitada'
        }));
    };
};

export const createLoanPolicy = async (req, res) => {
    const {dataPolicy } = req.body;
    const policyDto = createLoanPolicyDTO(dataPolicy);

    try {

        const createdPolicy = await createLoanPolicy(policyDto);

        return res.status(201).json(successCreateResponse({message: 'Política de préstamo creada exitosamente', data: baseLoanPolicyDTO(createdPolicy)}));
    } catch(error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({
            message: 'Error al intentar crear la política de préstamo'
        }));
    };
};

export const updateLoanPolicy = async (req, res) => {
    const {id} = req.params;
    const dataPolicy = req.body;

    const policyDto = updateLoanPolicyDTO(dataPolicy);

    try {
        const updatedPolicy = await updateLoanPolicy(id, policyDto);

        return res.status(202).json(successUpdateResponse({message: 'Política de préstamos actualizada con éxito', data: updatedPolicy}));

    } catch(error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({
            message: 'Error al intentar actualizar la política de préstamo'
        }));
    };
};

export const deletePolicy = async (req, res) => {
    const {id} = req.params;

    try {
        const deletedPolicy = await deletePolicyService(id);

        return res.status(202).json(successDeleteResponse({message: 'Política de préstamo eliminada con éxito', data: deletePolicy}));
    } catch(error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({
            message: 'Error al intentar eliminar la política de préstamo'
        }));
    };
}

