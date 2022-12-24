export interface GeneralResponse<T=any> {
    statusCode:number
    message:string
    data:T
}