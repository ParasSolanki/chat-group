import { badRequest } from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, z, ZodError } from 'zod'

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      return next()
    } catch (error) {
      let err = error
      if (error instanceof z.ZodError) {
        err = error.format()
      }
      return res.status(400).send({ success: false, errors: err })
    }
  }

export async function zParse<T extends AnyZodObject>(
  schema: T,
  req: Request
): Promise<z.infer<T>> {
  try {
    return schema.parseAsync(req)
  } catch (error) {
    if (error instanceof ZodError) {
      throw badRequest(error.message)
    }
    return badRequest(JSON.stringify(error))
  }
}
