import { v4 as uuidv4 } from 'uuid';

export const USER_ID_COOKIE = 'portfolio_user_id';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function getClientUserId(): string {
  if (typeof window === 'undefined') return '';
  
  let userId = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${USER_ID_COOKIE}=`))
    ?.split('=')[1];

  if (!userId) {
    userId = uuidv4();
    document.cookie = `${USER_ID_COOKIE}=${userId}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  }

  return userId;
}
