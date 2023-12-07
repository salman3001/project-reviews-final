import AdminUser from 'App/Models/adminUser/AdminUser'
import User from 'App/Models/user/User'

export const hasPermission = async (user: AdminUser, permission: string) => {
  await user.load('role')
  if (user?.role) {
    if (user?.role?.name === 'Super Admin') {
      return true
    }
    await user.role.load('permissions')
    const permissions = user.role.permissions.map((p) => p.name)

    if (permissions.includes(permission)) {
      return true
    }
    return false
  }
}

export const isAdmin = (user: AdminUser | User) => {
  if (user instanceof AdminUser) {
    return true
  } else {
    false
  }
}
