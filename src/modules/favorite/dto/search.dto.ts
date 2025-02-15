import { Channel, ChannelSearchResult } from "chzzk";

class ChannelDTO implements Channel {
  channelId: string;
  channelName: string;
  channelImageUrl?: string;
  channelDescription: string;
  followerCount: number;
  openLive: boolean;
  verifiedMark: boolean;
  userAdultStatus?: string;
  personalData?: { privateUserBlock: boolean };
}

export class SearchDTO implements ChannelSearchResult {
  channels: ChannelDTO[];
  size: number;
  nextOffset: number;
}
