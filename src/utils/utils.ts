import applicationContext from '../config/ApplicationContext';

export function isAdmin() {
  return applicationContext.getModule('ROLE_ADMIN') != null ? true : false;
}
