export class apiResponse {
    constructor(statusCode: number, data, message= "Success") {
        this.status= statusCode,
        this.data= data,        // 'this' add krne se yh class k parameter bnn gya
        this.message= message,
        this.success= true
    }
}