import { LoadMetricsRepository } from '@data/protocols/repository/metrics/load'
import { PrismaClient } from '@prisma/client'

export class MetricsRepository implements LoadMetricsRepository {
  private readonly prismaClient: PrismaClient

  constructor() {
    this.prismaClient = new PrismaClient()
  }

  public async onLoadMetrics(
    gameType: string
  ): Promise<LoadMetricsRepository.ReturnType> {
    console.log(gameType)
    try {
      const games = await this.prismaClient.game.findMany({
        where: {
          gameType
        }
      })
      if (games) {
        return {
          data: games
        }
      }
      return {
        error: {
          message: 'Error on load metrics - PD01',
          status: 500
        }
      }
    } catch (error) {
      this.prismaClient.$disconnect()
      return {
        error: {
          message: 'Error on load metrics - PD02',
          status: 500
        }
      }
    } finally {
      this.prismaClient.$disconnect()
    }
  }
}
