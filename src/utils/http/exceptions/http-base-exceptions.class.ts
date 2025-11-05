export class HttpBaseException {
    public readonly statusCode: number;
    public readonly description: string;
    public readonly data: any;

    constructor(statusCode: number, objectOrError: any, description: string) {
        this.statusCode = statusCode || 500;
        this.description = description || "Something went wrong";
        this.data = objectOrError;
      }
}