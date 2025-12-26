import "dotenv/config";
import { Pool } from 'pg' 
import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from '../../prisma/generated/client' 

const connectionString = `${process.env.DATABASE_URL}`

// Configuração do Pool com o fix do SSL
const pool = new Pool({ 
  connectionString, 
  ssl: {
    rejectUnauthorized: false 
  }
})

const adapter = new PrismaPg(pool) 

const prisma = new PrismaClient({ adapter })

export { prisma }