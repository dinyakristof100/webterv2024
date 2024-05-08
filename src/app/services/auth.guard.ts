import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const user = JSON.parse(localStorage.getItem("user") as string);
    return !!user;
  }
  // Assume no user is logged in if not in a browser environment
  return false;

};
