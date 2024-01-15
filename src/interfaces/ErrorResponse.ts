import { ErrorCode } from '../exceptions';

export default interface ErrorResponse {
  message: string;
  errorCode: ErrorCode;
  error: any;
}
