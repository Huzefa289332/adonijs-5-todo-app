import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/signup', 'AuthController.signup').as('signup')
Route.post('/signup', 'AuthController.signupPost')
