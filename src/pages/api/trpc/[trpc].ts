import * as trpc from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"
import { z } from "zod"
import { prisma } from "../../../db/client"

export const appRouter = trpc.router()
    .query('slugCheck', {
        input: z.object({
            slug: z.string()
        }),
        async resolve({ input }) {
            const count = await prisma.shortenedLink.count({
                where: {
                    slug: input.slug
                }
            })

            return { count }
        }
    })
    .mutation('createSlug', {
        input: z.object({
            slug: z.string(),
            url: z.string()
        }),
        async resolve({ input }) {
            try {
                await prisma.shortenedLink.create({
                    data: {
                        slug: input.slug,
                        url: input.url
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }
    })

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => null
})