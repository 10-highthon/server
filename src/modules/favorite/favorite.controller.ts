import { Body, Controller, Delete, Get, Put, Query } from "@nestjs/common";
import { ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";

import {
  GetChannelsDTO,
  MultiChannelDTO,
  OneChannelDTO,
} from "./dto/channel.dto";
import { SearchDTO } from "./dto/search.dto";
import { FavoriteService } from "./favorite.service";

@ApiTags("favorite & channel")
@Controller("favorite")
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get("/search")
  async searchChannels(query: string): Promise<SearchDTO> {
    return await this.favoriteService.searchChannels(query);
  }

  @Get()
  @ApiQuery({ name: "userId", required: true, type: String })
  async getChannels(@Query("userId") userId: string): Promise<GetChannelsDTO> {
    return await this.favoriteService.getChannels(userId);
  }

  @Put("/add")
  @ApiQuery({ name: "userId", required: true, type: String })
  @ApiBody({ type: OneChannelDTO })
  async addChannel(
    @Query("userId") userId: string,
    @Body() { channelId }: OneChannelDTO,
  ) {
    return await this.favoriteService.addChannel(userId, channelId);
  }

  @Delete("/remove")
  @ApiQuery({ name: "userId", required: true, type: String })
  @ApiBody({ type: MultiChannelDTO })
  async removeChannel(
    @Query("userId") userId: string,
    @Body() { channelIds }: MultiChannelDTO,
  ) {
    return await this.favoriteService.removeChannel(userId, channelIds);
  }
}
