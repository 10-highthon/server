import { ChzzkClient } from "chzzk";

import { Injectable } from "@nestjs/common";

@Injectable()
export class ChzzkService {
  private readonly client: ChzzkClient;

  constructor() {
    this.client = new ChzzkClient();
  }

  async search(query: string) {
    return await this.client.search.channels(query);
  }

  async getChannel(channelId: string) {
    return await this.client.channel(channelId);
  }

  async getLiveDetail(channelId: string) {
    return await this.client.live.detail(channelId);
  }
}
