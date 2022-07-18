import { LoadMetricsGameCrashRepository } from '@data/protocols/repository/metrics/load/crash'
import { LoadMetricsGameDoubleRepository } from '@data/protocols/repository/metrics/load/double'
import { PrismaClient } from '@prisma/client'

export class MetricsRepository
  implements LoadMetricsGameCrashRepository, LoadMetricsGameDoubleRepository
{
  private readonly prismaClient: PrismaClient

  constructor() {
    this.prismaClient = new PrismaClient()
  }

  public async onLoadMetricsCrash(): Promise<LoadMetricsGameCrashRepository.ReturnType> {
    try {
      const games = await this.prismaClient.gameCrash.findMany()
      if (games) {
        return {
          data: games
        }
      }
      return {
        error: {
          message: 'Error on load metrics crash client',
          status: 500
        }
      }
    } catch (error) {
      this.prismaClient.$disconnect()
      return {
        error: {
          message: 'Error on load metrics crash',
          status: 500
        }
      }
    } finally {
      this.prismaClient.$disconnect()
    }
  }

  public async onLoadMetricsDouble(): Promise<LoadMetricsGameCrashRepository.ReturnType> {
    try {
      const games = await this.prismaClient.gameDouble.findMany()
      if (games) {
        return {
          data: games
        }
      }
      return {
        error: {
          message: 'Error on load metrics game double client',
          status: 500
        }
      }
    } catch (error) {
      this.prismaClient.$disconnect()
      return {
        error: {
          message: 'Error on load metrics game double',
          status: 500
        }
      }
    } finally {
      this.prismaClient.$disconnect()
    }
  }
}
