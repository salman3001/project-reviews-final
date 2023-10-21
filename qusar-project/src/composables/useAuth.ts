import authStore from 'src/stores/authStroe';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const useAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
  role: 'admin' | 'user'
) => {
  const auth = authStore();
  const user = auth.user();
  if (role === 'user') {
    if (user) {
      return next();
    } else {
      return next({ name: 'userLogin' });
    }
  }

  if (role === 'admin') {
    if (user && user?.role) {
      return next();
    } else {
      return next({ name: 'adminLogin' });
    }
  }
};
