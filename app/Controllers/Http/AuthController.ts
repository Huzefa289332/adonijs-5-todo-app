import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public signup = async ({ view }: HttpContextContract) => {
    return await view.render('auth/signup')
  }

  public signupPost = async ({ request, response, session }: HttpContextContract) => {
    const signupSchema = schema.create({
      firstName: schema.string([
        rules.required(),
        rules.alpha(),
        rules.trim(),
        rules.maxLength(50),
      ]),
      lastName: schema.string([rules.required(), rules.alpha(), rules.trim(), rules.maxLength(50)]),
      email: schema.string([rules.required(), rules.email(), rules.trim()]),
      password: schema.string([rules.required(), rules.minLength(8)]),
    })

    const payload = await request.validate({
      schema: signupSchema,
      messages: {
        'firstName.required': 'First name is required',
        'firstName.alpha': 'First name must contain letters only',
        'firstName.maxLength': 'First name must not exceed 50 characters',

        'lastName.required': 'Last name is required',
        'lastName.alpha': 'Last name must contain letters only',
        'lastName.maxLength': 'Last name must not exceed 50 characters',

        'email.required': 'Email is required',
        'email.email': 'Email must be a valid email address',

        'password.required': 'Password is required',
        'password.minLength': 'Password must be at least 8 characters long',
      },
    })

    const exists = await User.findBy('email', payload.email)

    if (exists) {
      session.flash('danger', 'Email already exists')
      return response.redirect().back()
    }

    await User.create(payload)
    session.flash('success', 'Account created successfully')
    return response.redirect('/')
  }

  login = async ({ view }: HttpContextContract) => {
    return await view.render('auth/login')
  }

  loginPost = async ({ request }: HttpContextContract) => {
    const loginSchema = schema.create({
      email: schema.string([rules.required(), rules.email(), rules.trim()]),
      password: schema.string([rules.required()]),
    })

    const payload = await request.validate({
      schema: loginSchema,
      messages: {
        'email.required': 'Email is required',
        'email.email': 'Email must be a valid email address',
        'password.required': 'Password is required',
      },
    })
  }
}
