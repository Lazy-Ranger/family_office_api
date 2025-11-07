

export const PRODUCTION = 'production';
export const LTR_OBJECT = 'object';


export const ERRORS_LITERAL = {
  USER_NOT_FOUND: 'User not found.',
  FILE_NOT_FOUND: 'File not found.',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMP_CODE_ALREADY_EXISTS: 'User with this Employee code already exists',
  EMP_CODE_NOT_EXISTS: 'Employee Code does not exists master list',
  ASSET_NOT_FOUND: 'Asset class not found',
  ROLE_ALREADY_EXISTS: 'Role already exists',
  SHARE_CLASS_NOT_FOUND: 'Share class Not Found',
  INVALID_SHARE_CLASS: 'Please entered correct Share class',
  DENIED_RESOURCE: 'You are not authorized to access this resource.',
  HEADER_MISSING: 'Authorization header not found',
  INVALID_HEADER: 'Invalid Authorization header format',
  UNKNOWN_ERROR: 'Unknown error',
  INVALID_EMAIL: 'Incorrect email',
  INVALID_PASSWORD: 'Incorrect password',
  INVALID_TOKEN: 'Invalid AD Token Found',
  DELEGATION_ALREADY_EXISITS:
    'Unrevoked delegation is already present with this SRM combination.',
  DELEGATION_NOT_FOUND: 'Delegation not found',
  NOT_VALID_EXPIRY:
    'Expiry date should be greater than or equal to assigned date',
  NOT_VALID_DUE_DATE:
    'Due date should be greater than or equal to announcement date',
  NOT_VALID_CLIENT_LIST: 'No Client list found',
  TOKEN_ALREADY_EXISTS: 'Token already exists',
} as const;



export const PERMISSIONS = {
  ALL: 'AllPermissions',
  LIST_ROLE: 'ListRole',
  CREATE_ROLE: 'CreateRole',
} as const;