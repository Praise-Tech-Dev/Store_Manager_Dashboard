import type { UpdateProductDTO } from "./updateProductDTO.types";

export interface UpdateProductParams {
  id: number;
  payload: UpdateProductDTO;
}
