import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

const users = [
  {
    email: 'test1@test.com',
    password: 'test',
    first_name: 'test',
    last_name: 'one',
  },
  {
    email: 'test2@test.com',
    password: 'test',
    first_name: 'test',
    last_name: 'two',
  },
]

export default class extends BaseSeeder {
  public async run() {
    try {
      await Database.table('users').multiInsert(users)
      console.info('Users seeded successfully')
    } catch (error) {
      console.error(error)
    }
  }
}
