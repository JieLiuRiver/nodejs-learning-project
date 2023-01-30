export { Request, Response, NextFunction } from 'express';

export type JWTUserInfo = {
  username: string;
  password: string;
}

export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

export enum EPermissionType {
  // eslint-disable-next-line no-unused-vars
  READ = 'READ',
  // eslint-disable-next-line no-unused-vars
  WRITE = 'WRITE',
  // eslint-disable-next-line no-unused-vars
  DELETE = 'DELETE',
  // eslint-disable-next-line no-unused-vars
  SHARE = 'SHARE',
  // eslint-disable-next-line no-unused-vars
  UPLOAD_FILES = 'UPLOAD_FILES',
}

export type Permission =
  | EPermissionType.READ
  | EPermissionType.WRITE
  | EPermissionType.DELETE
  | EPermissionType.SHARE
  | EPermissionType.UPLOAD_FILES;

export type GroupType = {
  id: string;
  name: string;
  permissions: Array<Permission>;
};
