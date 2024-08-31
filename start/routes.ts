import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/signup', 'AuthController.signup').as('signup')
Route.post('/signup', 'AuthController.signupPost')

Route.get('/login', 'AuthController.login').as('login')
Route.post('/login', 'AuthController.loginPost')
