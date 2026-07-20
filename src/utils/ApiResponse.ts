export class apiResponse {
    status: number;
    data: any;
    message: string;
    success: boolean;

    constructor(statusCode: number, data: any, message = "Success") {
        this.status = statusCode;
        this.data = data;
        this.message = message;
        this.success = true;
    }
}