import * as dotenv from 'dotenv';
dotenv.config();

export const COMPANY_ALREADY_EXIST_ERROR_MSG = 'Company already exists, please choose a different name.';
export const INVALID_EMAIL_ADDRESS_ERROR_MSG = 'Enter a valid email address.';

export const USER_NAME = process.env.USER_NAME || 'autotest1 + autotest - stg - automation - homeassignment - 1@melio.com';
export const PASSWORD = process.env.PASSWORD || '85z6Jiv#@L95XQ84'
