import type { UpdateUserDTO } from "./user.types";

export interface UpdateUserPayload {
    id: number;
    data: UpdateUserDTO; 
}