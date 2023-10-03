// import Application from '@ioc:Adonis/Core/Application'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AdminUserFactory from 'Database/factories/adminUser/AdminUserFactory'
import ContactMessageFactory from 'Database/factories/helpcenter/ContactMessageFactory'
import ContinentFactory from 'Database/factories/address/ContinentFactory'
import BlogCategoryFactory from 'Database/factories/blogs/BlogCategoryFactory'
import KnowledgebaseCategoryFactory from 'Database/factories/helpcenter/KnowledgebaseCategoryFactory'
import RoleFactory from 'Database/factories/adminUser/RoleFactory'
import UserFactory from 'Database/factories/user/UserFactory'
import SupportTicketFactory from 'Database/factories/helpcenter/SupportTicketFactory'

export default class extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    // if (
    //   (!Seeder.default.environment.includes('development') && Application.inDev) ||
    //   (!Seeder.default.environment.includes('testing') && Application.inTest) ||
    //   (!Seeder.default.environment.includes('production') && Application.inProduction)
    // ) {
    //   return
    // }
    await new Seeder.default(this.client).run()
  }
  public async run() {
    await AdminUserFactory.merge([{ email: 'admin@gmail.com', isActive: true, roleId: 1 }])
      .with('role', 3, (role) => {
        role.merge([{ name: 'Super Admin' }]).with('permissions', 3, (perm) => {
          perm.merge([{ name: 'Create User' }, { name: 'Delete User' }, { name: 'Edit User' }])
        })
      })
      .with('social')
      .createMany(20)

    await RoleFactory.merge([{ name: 'Moderator' }, { name: 'Vender' }]).createMany(2)

    await ContinentFactory.with('country', 3, (country) => {
      country.with('state', 3, (state) => {
        state.with('city', 3, (city) => {
          city.with('street', 4)
        })
      })
    }).createMany(3)

    await UserFactory.merge([
      { email: 'user@gmail.com', password: '123456789', userName: 'user123' },
    ])
      .with('address', 1, (add) => {
        add.with('continent', 1).with('country').with('state').with('city').with('street')
      })
      .with('educations', 2)
      .with('experiences', 2, (ex) => {
        ex.with('city').with('country').with('state').with('department').with('industry')
      })
      .with('languages', 2)
      .with('social')
      .with('favoriteLinks', 3)
      .with('skills', 4)
      .with('NotificationSetting')
      .createMany(10)

    await BlogCategoryFactory.with('blogs', 5).createMany(4)
    await KnowledgebaseCategoryFactory.with('contents', 5).createMany(3)
    await ContactMessageFactory.createMany(5)
    await SupportTicketFactory.createMany(3)
  }
}