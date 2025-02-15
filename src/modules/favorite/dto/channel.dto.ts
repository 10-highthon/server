import { Channel, LiveDetail, LivePollingStatus, PartialChannel } from "chzzk";
import { IsString } from "class-validator";

export class OneChannelDTO {
  @IsString()
  channelId: string;
}

export class MultiChannelDTO {
  @IsString({ each: true })
  channelIds: string[];
}

export class ChannelDTO implements Channel {
  channelDescription: string;
  followerCount: number;
  openLive: boolean;
  channelId: string;
  channelName: string;
  channelImageUrl?: string;
  verifiedMark: boolean;
  userAdultStatus?: string;
  personalData?: { privateUserBlock: boolean };
}

class PartialChannelDTO implements PartialChannel {
  channelId: string;
  channelName: string;
  channelImageUrl?: string;
  verifiedMark: boolean;
  userAdultStatus?: string;
  personalData?: { privateUserBlock: boolean };
}

class GetChannelDTO implements Partial<LiveDetail> {
  status: "OPEN" | "CLOSE";
  closeDate?: string;
  clipActive: boolean;
  chatActive: boolean;
  chatAvailableGroup: string;
  paidPromotion: boolean;
  chatAvailableCondition: string;
  minFollowerMinute: number;
  p2pQuality: string[];
  livePollingStatus: LivePollingStatus;
  userAdultStatus?: string;
  chatDonationRankingExposure: boolean;
  adParameter: { tag: string };
  dropsCampaignNo?: string;
  liveTitle: string;
  liveImageUrl: string;
  defaultThumbnailImageUrl?: string;
  concurrentUserCount: number;
  accumulateCount: number;
  openDate: string;
  liveId: number;
  adult: boolean;
  tags: string[];
  chatChannelId: string;
  categoryType?: string;
  liveCategory?: string;
  liveCategoryValue?: string;
  channel: PartialChannelDTO;
  videoUrl: string;
}

export class GetChannelsDTO {
  channels: GetChannelDTO[];
  count: number;
}
