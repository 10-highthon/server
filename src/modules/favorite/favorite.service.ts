import { Injectable } from "@nestjs/common";

import { ChzzkService } from "src/common/modules/chzzk/chzzk.service";
import { PrismaService } from "src/common/modules/prisma/prisma.service";

@Injectable()
export class FavoriteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly chzzkService: ChzzkService,
  ) {}

  async searchChannels(query: string) {
    return await this.chzzkService.search(query);
  }

  async getChannel(channelId: string) {
    return await this.chzzkService.getChannel(channelId);
  }

  async getChannels(userId: string) {
    const channelIds = (
      await this.prisma.favorite.findMany({
        where: {
          userId,
        },
      })
    ).map((favorite) => favorite.channelId);

    return {
      channels: await Promise.all(
        channelIds.map((channelId) => this.chzzkService.getChannel(channelId)),
      ),
      count: channelIds.length,
    };
  }

  async getChannelLive(userId: string, channelId: string) {
    const liveDetail = await this.chzzkService.getLiveDetail(channelId);

    return {
      ...liveDetail,
      videoUrl: liveDetail.livePlayback.media[0]?.path ?? "",
    };
  }

  async getChannelsLive(userId: string) {
    const channelIds = (
      await this.prisma.favorite.findMany({
        where: {
          userId,
        },
      })
    ).map((favorite) => favorite.channelId);

    const liveDetails = await Promise.all(
      channelIds.map((channelId) => this.chzzkService.getLiveDetail(channelId)),
    );

    return {
      channels: liveDetails.map((detail) => ({
        ...detail,
        videoUrl: detail.livePlayback.media[0]?.path ?? "",
      })),
      count: liveDetails.length,
    };
  }

  async addChannel(userId: string, channelId: string) {
    return await this.prisma.favorite.create({
      data: {
        channelId,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async removeChannel(userId: string, channelIds: string[]) {
    return await this.prisma.favorite.deleteMany({
      where: {
        userId,
        channelId: {
          in: channelIds,
        },
      },
    });
  }
}
