import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('content/unique-field', 'helpcenter/KnowledgeBaseContentsController.uniqueField')
  Route.resource('content', 'helpcenter/KnowledgeBaseContentsController').apiOnly()
  Route.get('categories/unique-field', 'helpcenter/KnowledgeBaseCategoriesController.uniqueField')
  Route.resource('categories', 'helpcenter/KnowledgeBaseCategoriesController').apiOnly()
  Route.resource('contact-message', 'helpcenter/ContactMessagesController').apiOnly()
  Route.resource('support-ticket', 'helpcenter/SupportTicketsController').apiOnly()
}).prefix('api/help-center')
