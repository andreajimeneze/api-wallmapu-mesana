import { paginationResponseDTO } from "../responses/paginationResponse.js";

export const createPaginationService = ({
  model,          
  searchFields,    
  includes,        
  dtoMapper,      
  basePath,
  idField,       
  customWhere = {}, 
}) => {
  return async ({ page, limit, search }) => {
    // Validación de parámetrosW
    limit = Number.isInteger(Number(limit)) ? Number(limit) : 10;
    page = Number.isInteger(Number(page)) ? Number(page) : 1;

    const DEFAULT_LIMIT = 10;
    const MAX_LIMIT = 100;

    limit = Number(limit) || DEFAULT_LIMIT;
    page = Number(page) || 1;

    if (limit < 1) limit = DEFAULT_LIMIT;
    if (limit > MAX_LIMIT) limit = MAX_LIMIT;

    // Configuración de búsqueda
    const where = { ...customWhere };
    
    if (search && search.trim() !== "") {
      const searchConditions = searchFields.map(field => ({
        [field]: { [Op.iLike]: `%${search}%` }
      }));
      where[Op.or] = searchConditions;
    }



    // Contar items
    const items = await model.count({
      include: includes,
      where,
      distinct: true,
      col:  idField,
    });

    if (items === 0) {
      return {
        response: `No se encontraron ${model.name}s`,
        data: paginationResponseDTO({
          page: 0,
          pages: 0,
          items: 0,
          next: "none",
          prev: "none",
          data: [],
        }),
      };
    }

    const pages = Math.ceil(items / limit);
    const haveSearch = search && search.trim() !== "";

    if (page > pages && page > 0) {
      page = haveSearch ? 1 : pages;
    } else if (page < 1) {
      page = 1;
    }

    const offset = (page - 1) * limit;

    //      console.log('🔍 CONFIGURACIÓN RECIBIDA:');
    // console.log('- Modelo:', model.name);
    // console.log('- Includes:', includes.map(inc => inc.as || inc.model.name));

    const result = await model.findAll({
      where,
      include: includes,
      limit,
      offset,
      distinct: true,
      order: [["updated_at", "DESC"]],
    });

     console.log('📊 RESULTADO CRUDO:');
    console.log('- Cantidad de registros:', result.length);
    
    if (result.length > 0) {
      const firstItem = result[0];
      console.log('- Primer item - ID:', firstItem[idField]);
      console.log('- Primer item - keys:', Object.keys(firstItem.toJSON ? firstItem.toJSON() : firstItem));
      console.log('- Tiene authors?', !!firstItem.authors);
      console.log('- Tiene editions?', !!firstItem.editions);
      console.log('- Tiene genre?', !!firstItem.genre);
      
      // Verifica si los includes están cargados
      console.log('- Includes cargados:', {
        authors: firstItem.authors?.length || 0,
        editions: firstItem.editions?.length || 0,
        genre: firstItem.genre ? 'sí' : 'no'
      });
    }

    return {
      response: `${model.name}s obtenidos exitosamente`,
      data: paginationResponseDTO({
        page,
        pages,
        items,
        next: page < pages 
          ? `${basePath}?page=${page + 1}&items=${limit}&search=${search}`
          : null,
        prev: page > 1
          ? `${basePath}?page=${page - 1}&items=${limit}&search=${search}`
          : null,
        data: result.map(dtoMapper),
      }),
    };
  };
};