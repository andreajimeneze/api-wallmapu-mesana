import { internalServerResponse, notFoundResponse, succesGetResponse, successCreateResponse, successDeleteResponse, successUpdateResponse } from "../../shared/apiResponse.js"
import { baseLoanPolicyDTO, createLoanPolicyDTO, updateLoanPolicyDTO } from "./loan_policy.dto.js";
import { deletePolicyService, getAllLoanPoliciesService, getLoanPolicyByIdService } from "./loan_policy.service.js"

export const getAllLoanPolicies = async ( req, res ) => {
    try {

        const loanPolicies = await getAllLoanPoliciesService();

        if(loanPolicies.length === 0) {
            return res.status(404).json(notFoundResponse({message: 'No existen políticas de préstamos cargadas'}));
        };

        return res.status(200).json(succesGetResponse({message: 'Políticas de préstamo obtenidas exitosamente', result: loanPolicies.map(baseLoanPolicyDTO)}));
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

        return res.status(200).json(succesGetResponse({message: 'Política de préstamo obtenida con éxito', result: baseLoanPolicyDTO(selectedPolicy)}));

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

        return res.status(201).json(successCreateResponse({message: 'Política de préstamo creada exitosamente', result: baseLoanPolicyDTO(createdPolicy)}));
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

        return res.status(202).json(successUpdateResponse({message: 'Política de préstamos actualizada con éxito', result: updatedPolicy}));

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

        return res.status(202).json(successDeleteResponse({message: 'Política de préstamo eliminada con éxito', result: deletePolicy}));
    } catch(error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({
            message: 'Error al intentar eliminar la política de préstamo'
        }));
    };
}

