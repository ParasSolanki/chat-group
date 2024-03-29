import fp from 'fastify-plugin'
import {
  FastifyPluginCallback,
  FastifySchemaCompiler,
  FastifyTypeProvider,
} from 'fastify'
import type { FastifySerializerCompiler } from 'fastify/types/schema'
import { z } from 'zod'

export interface ZodValidateTypeProvider extends FastifyTypeProvider {
  output: this['input'] extends z.ZodTypeAny ? z.infer<this['input']> : never
}

declare module 'fastify' {
  interface FastifyInstance<RawServer, RawRequest, RawReply, Logger> {
    withTypeProvider(): FastifyInstance<
      RawServer,
      RawRequest,
      RawReply,
      Logger,
      ZodValidateTypeProvider
    >
  }
}

export type FastifyZodValidateOptions = {
  handleValidatorError?: (error: z.ZodError<any>, data: any) => any
  handleSerializerError?: <E extends Error>(
    error: z.ZodError<any>,
    data: any
  ) => E
}

const ZodValidator: FastifyPluginCallback<FastifyZodValidateOptions> = (
  fastify,
  inputOptions,
  next
) => {
  const defaultOptions = {
    /**
     * default error handlers
     */
    handleValidatorError: (error: z.ZodError<any>) => {
      const { formErrors, fieldErrors } = error.flatten((issue) => ({
        message: issue.message,
        errorCode: issue.code,
      }))

      let errors = 'Response is incompatible with the schema'

      if (!Array.isArray(formErrors) && typeof formErrors === 'object') {
        errors = JSON.stringify(formErrors)
      } else if (
        !Array.isArray(fieldErrors) &&
        typeof fieldErrors === 'object'
      ) {
        errors = JSON.stringify(fieldErrors)
      }

      return {
        error: new Error(errors),
      }
    },
    handleSerializerError: () =>
      new Error('Response is incompatible with the schema'),
  }

  const options = { ...defaultOptions, ...inputOptions }

  /**
   * Handle validation with custom error handler.
   */
  const validatorCompiler: FastifySchemaCompiler<z.ZodAny> =
    ({ schema }) =>
    (data) => {
      const validatedValue = schema.safeParse(data)

      if (validatedValue.success) {
        return { value: validatedValue.data }
      }

      return options.handleValidatorError(validatedValue.error, data)
    }

  /**
   * Handle serialization with custom error handler.
   */
  const serializerCompiler: FastifySerializerCompiler<z.ZodAny> =
    ({ schema }) =>
    (data): string => {
      const result = schema.safeParse(data)

      if (result.success) {
        return JSON.stringify(result.data)
      }

      throw options.handleSerializerError(result.error, data)
    }

  fastify.setValidatorCompiler(validatorCompiler)
  fastify.setSerializerCompiler(serializerCompiler)

  next()
}

export default fp(ZodValidator, {
  name: 'zod-validator',
  fastify: '4.x',
})
