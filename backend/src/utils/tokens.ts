import jwt from 'jsonwebtoken'
import invariant from 'invariant'
import { pick } from 'lodash'

invariant(process.env.SECRET_TOKEN, 'Secret token not defined')
invariant(process.env.SECRET_TOKEN2, 'Secret token 2 not defined')

const SECRET_TOKEN = process.env.SECRET_TOKEN
const SECRET_TOKEN2 = process.env.SECRET_TOKEN2

export const createTokens = async (user: any) => {
  const createToken = jwt.sign(
    {
      user: pick(user, ['id', 'email', 'firstName', 'lastName']),
    },
    SECRET_TOKEN,
    {
      expiresIn: '1m',
    }
  )

  const createRefreshToken = jwt.sign(
    {
      user: pick(user, 'id'),
    },
    SECRET_TOKEN2,
    {
      expiresIn: '7d',
    }
  )

  return Promise.all([createToken, createRefreshToken])
}
