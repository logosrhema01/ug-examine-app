/**
 * UG Examine
 * UG Examine API description
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface CreateTicketDto { 
    description?: string;
    studentID: string;
    status: CreateTicketDto.StatusEnum;
    allocationID: string;
}
export namespace CreateTicketDto {
    export type StatusEnum = 'created' | 'open' | 'investigating' | 'closed';
    export const StatusEnum = {
        Created: 'created' as StatusEnum,
        Open: 'open' as StatusEnum,
        Investigating: 'investigating' as StatusEnum,
        Closed: 'closed' as StatusEnum
    };
}


