import { compare, hash } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'
import { idArg, mutationType, stringArg } from 'nexus'
import { APP_SECRET, getUserId } from '../utils'

export const Mutation = mutationType({
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg({ nullable: true }),
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, { name, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10)
        const user = await ctx.photon.users.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        })
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, { email, password }, context) => {
        const user = await context.photon.users.findOne({
          where: {
            email,
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('verifyToken', {
      type: 'AuthPayload',
      args: {
        token: stringArg(),
      },
      resolve: async (parent, { token }, context) => {
        const { userId } = verify(token, APP_SECRET);
        const user = await context.photon.users.findOne({
          where: {
            id: userId,
          },
        })
        if (!user) {
          throw new Error(`Invalid token: ${token}`)
        }
        return {
          token,
          user,
        }
      },
    })

    // t.field('createDraft', {
    //   type: 'Assessment',
    //   args: {
    //     title: stringArg({ nullable: true }),
    //     description: stringArg({ nullable: true }),
    //   },
    //   resolve: (parent, { title, description }, ctx) => {
    //     const authorId = getUserId(ctx)
    //     return ctx.photon.assessments.create({
    //       data: {
    //         title,
    //         description,
    //         published: false,
    //         author: { connect: { id: authorId } },
    //       },
    //     })
    //   },
    // })

    t.crud.createOneAssessment(),
    t.crud.deleteOneAssessment(),

    t.field('publish', {
      type: 'Assessment',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.photon.posts.update({
          where: { id },
          data: { published: true },
        })
      },
    })
  },
})
