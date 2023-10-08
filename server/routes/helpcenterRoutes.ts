import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('unique-content-title', 'helpcenter/KnowledgeBaseContentsController.uniqueTitle')
  Route.get('unique-content-slug', 'helpcenter/KnowledgeBaseContentsController.uniqueSlug')
  Route.get('unique-content-order', 'helpcenter/KnowledgeBaseContentsController.uniqueOrder')
  Route.resource('content', 'helpcenter/KnowledgeBaseContentsController')
  Route.get('unique-category-name', 'helpcenter/KnowledgeBaseCategoriesController.uniqueName')
  Route.get('unique-category-slug', 'helpcenter/KnowledgeBaseCategoriesController.uniqueSlug')
  Route.get('unique-category-order', 'helpcenter/KnowledgeBaseCategoriesController.uniqueOrder')
  Route.resource('categories', 'helpcenter/KnowledgeBaseCategoriesController')
  Route.resource('contact-message', 'helpcenter/ContactMessagesController')
  Route.resource('support-ticket', 'helpcenter/SupportTicketsController')
}).prefix('api/help-center')
