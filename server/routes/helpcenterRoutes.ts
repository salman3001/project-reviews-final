import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('content', 'helpcenter/KnowledgeBaseContentsController.index')
  Route.get('categories', 'helpcenter/KnowledgeBaseCategoriesController.index')
}).prefix('api/admin/help-center')
