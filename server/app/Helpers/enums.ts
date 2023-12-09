export enum TicketStatus {
  OPEN = 'Open',
  CLOSED = 'Closed',
  RESPONDED = 'Responded',
}

export enum ServiceLocationType {
  SPECIFIC = 'Specific',
  PHYSICAL = 'Physical',
}

export enum permissions {
  MANAGE_ADMIN_USERS = 'Manage Admin Users',
  MANAGE_BLOGS = 'Manage Blogs',
  MANAGE_CAMPAIGNS = 'Manage Campains',
  MANAGE_SUBSCRIBERS = 'Manage Subscribers',
  MANAGE_INTERESTS = 'Manage Intrests',
  MANAGE_TEMPLATES = 'Manage Templates',
  MANAGE_CONTACT_MESSAGES = 'Manage Cotact Messages',
  MANAGE_KNOWLEDGEBASE = 'Manage Knowledgebase',
  MANAGE_TICKETS = 'Manage Support Tickets',
  MANAGE_PRODUCT = 'Manage Products',
  MANAGE_SERVICE = 'Manage Services',
  MANAGE_USER = 'Manage Users',
  MANAGE_LOCATION = 'Manage Location',
  MANAGE_ROLES = 'Manage Roles',
}

export enum NotificationTypes {
  NEW_SUPPORT_TICKET = 'new-support-ticket',
}
