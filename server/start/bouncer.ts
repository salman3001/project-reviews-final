/**
 * Contract source: https://git.io/Jte3T
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import AdminUser from 'App/Models/adminUser/AdminUser'
import SupportTicket from 'App/Models/helpcenter/SupportTicket'
import Product from 'App/Models/product/Product'
import User from 'App/Models/user/User'

const hasPermission = async (user: AdminUser, permission: string) => {
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

const isAdmin = (user: AdminUser | User) => {
  if (user instanceof AdminUser) {
    return true
  } else {
    false
  }
}

/*
|--------------------------------------------------------------------------
| Bouncer Actions
|--------------------------------------------------------------------------
|
| Actions allows you to separate your application business logic from the
| authorization logic. Feel free to make use of policies when you find
| yourself creating too many actions
|
| You can define an action using the `.define` method on the Bouncer object
| as shown in the following example
|
| ```
| 	Bouncer.define('deletePost', (user: User, post: Post) => {
|			return post.user_id === user.id
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "actions" const from this file
|****************************************************************
*/
Bouncer.define('manageAdminUsers', async (user: User | AdminUser) => {
  if (isAdmin(user) && (await hasPermission(user as AdminUser, 'Manage Admin Users'))) {
    return true
  } else {
    return false
  }
})
  .define('manageBlogs', async (user: any) => {
    if (isAdmin(user) && (await hasPermission(user, 'Manage Blogs'))) {
      return true
    } else {
      return false
    }
  })

  .define('manageCampaigns', async (user: any) => {
    if (isAdmin(user) && (await hasPermission(user, 'Manage Campaigns'))) {
      return true
    } else {
      return false
    }
  })
  .define('manageInterests', async (user: any) => {
    if (isAdmin(user) && (await hasPermission(user, 'Manage Interests'))) {
      return true
    } else {
      return false
    }
  })
  .define('manageSubscribers', async (user: any) => {
    if (isAdmin(user) && (await hasPermission(user, 'Manage Subscribers'))) {
      return true
    } else {
      return false
    }
  })
  .define('manageTemplates', async (user: any) => {
    if (isAdmin(user) && (await hasPermission(user, 'Manage Templates'))) {
      return true
    } else {
      return false
    }
  })
  .define('manageContactMessages', async (user: any) => {
    if (isAdmin(user) && (await hasPermission(user, 'Manage Contact Messages'))) {
      return true
    } else {
      return false
    }
  })
  .define('manageKnowlegdebase', async (user: any) => {
    if (isAdmin(user) && (await hasPermission(user, 'Manage Knowledgebase'))) {
      return true
    } else {
      return false
    }
  })
  .define('createSupportTicket', (user: any) => {
    if (user) {
      return true
    } else {
      return false
    }
  })
  .define('viewSupportTicket', async (user: any, ticket: SupportTicket) => {
    if (user instanceof User && ticket.userId === user.id) {
      return true
    }

    if (isAdmin(user) && (await hasPermission(user, 'Manage Support Tickets'))) {
      return true
    } else {
      return false
    }
  })
  .define('updateSupportTicket', async (user: any, ticket: SupportTicket) => {
    if (ticket.userId === user.id) {
      return true
    }

    if (isAdmin(user) && (await hasPermission(user, 'Manage Support Tickets'))) {
      return true
    } else {
      return false
    }
  })
  .define('deleteSupportTicket', async (user: any) => {
    if (isAdmin(user) && (await hasPermission(user, 'Manage Support Tickets'))) {
      return true
    } else {
      return false
    }
  })
  .define('listSupportTicket', async (user: any, ticket: SupportTicket[]) => {
    const invalidTickets = ticket.filter((t) => t.userId !== user.id)
    if (invalidTickets.length > 0) {
      return false
    }

    if (isAdmin(user) && (await hasPermission(user, 'Manage Support Tickets'))) {
      return true
    } else {
      return false
    }
  })

  .define('createProducts', async (user: any) => {
    if (user) {
      return true
    } else {
      return false
    }
  })
  .define('updateProducts', async (user: any, product: Product) => {
    if (product.userId === user.id) {
      return true
    }
    if (isAdmin(user) && (await hasPermission(user, 'Manage Products'))) {
      return true
    } else {
      return false
    }
  })
  .define('deleteProducts', async (user: any, product: Product) => {
    if (product.userId === user.id) {
      return true
    }
    if (isAdmin(user) && (await hasPermission(user, 'Manage Products'))) {
      return true
    } else {
      return false
    }
  })

export const { actions } = Bouncer

/*
|--------------------------------------------------------------------------
| Bouncer Policies
|--------------------------------------------------------------------------
|
| Policies are self contained actions for a given resource. For example: You
| can create a policy for a "User" resource, one policy for a "Post" resource
| and so on.
|
| The "registerPolicies" accepts a unique policy name and a function to lazy
| import the policy
|
| ```
| 	Bouncer.registerPolicies({
|			UserPolicy: () => import('App/Policies/User'),
| 		PostPolicy: () => import('App/Policies/Post')
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "policies" const from this file
|****************************************************************
*/
export const { policies } = Bouncer.registerPolicies({})
