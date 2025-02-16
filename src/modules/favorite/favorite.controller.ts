import { Body, Controller, Get, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";

import { GetUser } from "src/common/decorators/get.user.decorator";

import {
  ChannelDTO,
  ChannelsDTO,
  GetChannelDTO,
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
  @ApiQuery({ name: "query", type: String })
  async searchChannels(@Query("query") query: string): Promise<SearchDTO> {
    return await this.favoriteService.searchChannels(query);
  }

  @Get()
  @ApiQuery({ name: "channelId", type: String })
  async getChannel(@Query("channelId") channelId: string): Promise<ChannelDTO> {
    return await this.favoriteService.getChannel(channelId);
  }

  @Get("/all")
  @ApiBearerAuth()
  async getChannels(@GetUser() userId: string): Promise<ChannelsDTO> {
    return await this.favoriteService.getChannels(userId);
  }

  @Get("/live")
  @ApiBearerAuth()
  @ApiQuery({ name: "channelId", type: String })
  async getChannelLive(
    @GetUser() userId: string,
    @Query("channelId") channelId: string,
  ): Promise<GetChannelDTO> {
    return await this.favoriteService.getChannelLive(userId, channelId);
  }

  @Get("/live/all")
  @ApiBearerAuth()
  async getChannelsLive(@GetUser() userId: string): Promise<GetChannelsDTO> {
    return await this.favoriteService.getChannelsLive(userId);
  }

  @Put("/add")
  @ApiBody({ type: OneChannelDTO })
  @ApiBearerAuth()
  async addChannel(
    @GetUser() userId: string,
    @Body() { channelId }: OneChannelDTO,
  ) {
    return await this.favoriteService.addChannel(userId, channelId);
  }

  @Post("/remove")
  @ApiBody({ type: MultiChannelDTO })
  @ApiBearerAuth()
  async removeChannel(
    @GetUser() userId: string,
    @Body() { channelIds }: MultiChannelDTO,
  ) {
    return await this.favoriteService.removeChannel(userId, channelIds);
  }
}
