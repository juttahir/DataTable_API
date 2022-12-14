export interface ListPaymentDTO{
    id: string;
    document: string;
    email: string;
    description: string;
    definitive: boolean;
    status: boolean;
    createdDate: Date;
    dateStart: Date;
    dateEnd: Date;
}