import * as trpc from '@trpc/server'

import { Context } from '../../../../src/context'
import { permissions } from '../../../shield/shield'

export const t = trpc.initTRPC.context<Context>().create()

export const permissionsMiddleware = t.middleware(permissions)

export const shieldedProcedure = t.procedure.use(permissionsMiddleware)

export const publicProcedure = t.procedure
