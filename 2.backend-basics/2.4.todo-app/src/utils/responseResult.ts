import { Response } from "express";
import httpStatus from "http-status";

export class ResponseResult {
  public readonly statusCode: number;
  public readonly data: Record<string, any> = {};
  constructor(statusCode: number, data?: any) {
    this.statusCode = statusCode;
    this.data = Object.assign(this.data, data);
  }
  public send(response: Response): Response {
    return response.status(this.statusCode).json(this.data);
  }

  public static createSuccess(statusCode: number, data?: Record<string, any>) {
    return new ResponseResult(statusCode, { ok: true, ...data });
  }

  public static createFail(
    statusCode: number,
    message: string,
    data?: Record<string, any>
  ) {
    return new ResponseResult(statusCode, { error: message, ...data });
  }

  public static Ok(data?: Record<string, any>) {
    return this.createSuccess(httpStatus.OK, data);
  }
  public static Created(data?: Record<string, any>) {
    return this.createSuccess(httpStatus.CREATED, data);
  }
  public static NotFound(data?: Record<string, any>) {
    return this.createFail(httpStatus.NOT_FOUND, "not found", data);
  }
  public static Forbidden(data?: Record<string, any>) {
    return this.createFail(httpStatus.FORBIDDEN, "forbidden", data);
  }
  public static BadRequest(data?: Record<string, any>) {
    return this.createFail(httpStatus.BAD_REQUEST, "bad request", data);
  }
  public static InternalServerError(data?: Record<string, any>) {
    return this.createFail(
      httpStatus.INTERNAL_SERVER_ERROR,
      "server error",
      data
    );
  }
  public static Conflict(data?: Record<string, any>) {
    return this.createFail(httpStatus.CONFLICT, "conflict", data);
  }
}
