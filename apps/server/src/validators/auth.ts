import z from 'zod'

export const signupBodySchema = z.object(
  {
    firstName: z
      .string({
        required_error: 'First name is required',
      })
      .min(2, { message: 'first name must have 2 or more character' }),
    lastName: z
      .string({
        required_error: 'Last name is required',
      })
      .min(2, { message: 'Last name must have 2 or more character' }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Not a valid email'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, { message: 'Password must have 8 or more character' }),
  },
  {
    required_error: 'Body cant be empty',
    invalid_type_error: 'Body cant be empty',
  }
)

export const loginBodySchema = z.object(
  {
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Not a valid email'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, { message: 'Password must have 8 or more character' }),
  },
  {
    required_error: 'Body cant be empty',
    invalid_type_error: 'Body cant be empty',
  }
)
