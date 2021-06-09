export default class ErrorResponse extends Error {

  constructor(
    public httpStatusCode: number,
    message: string
  ) { super(message) }

}


export const isErrorResponse = (error: any): error is ErrorResponse => {
  return error.hasOwnProperty("httpStatusCode")
}