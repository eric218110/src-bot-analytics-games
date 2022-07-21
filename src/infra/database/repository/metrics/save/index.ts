import { SaveMetricsGameCrashRepository } from '@data/protocols/repository/metrics/save/crash'
import { SaveMetricsGameDoubleRepository } from '@data/protocols/repository/metrics/save/double'
import { PrismaClient } from '@prisma/client'

export class MetricsSaveRepository
  implements SaveMetricsGameCrashRepository, SaveMetricsGameDoubleRepository
{
  private readonly prismaClient: PrismaClient

  constructor() {
    this.prismaClient = new PrismaClient()
  }

  public async onSaveMetricsDouble(
    props: SaveMetricsGameDoubleRepository.Props
  ): Promise<SaveMetricsGameDoubleRepository.ReturnType> {
    try {
      await this.prismaClient.gameDouble.create({
        data: {
          ...props
        }
      })
      return { data: true }
    } catch (error) {
      this.prismaClient.$disconnect()
      return {
        error: {
          message: 'Error on save metrics double',
          status: 500
        }
      }
    } finally {
      this.prismaClient.$disconnect()
    }
  }

  public async onSaveMetricsCrash(
    props: SaveMetricsGameCrashRepository.Props
  ): Promise<SaveMetricsGameCrashRepository.ReturnType> {
    try {
      await this.prismaClient.gameCrash.create({
        data: {
          ...props
        }
      })
      return { data: true }
    } catch (error) {
      this.prismaClient.$disconnect()
      return {
        error: {
          message: 'Error on save metrics crash',
          status: 500
        }
      }
    } finally {
      this.prismaClient.$disconnect()
    }
  }
}
