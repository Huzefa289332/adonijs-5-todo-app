import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
  public signup = async ({ view }: HttpContextContract) => {
    const html = await view.render('auth/signup')
    return html
  }

  public signupPost = async ({ request, response }: HttpContextContract) => {
    /**
     * Schema definition
     */
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

    /**
     * Validate request body against the schema
     */
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

    console.log(payload)
  }
}
