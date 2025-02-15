import {
  LiveDetail,
  LivePlayback,
  LivePollingStatus,
  Media,
  PartialChannel,
} from "chzzk";
import { IsString } from "class-validator";

export class OneChannelDTO {
  @IsString()
  channelId: string;
}

export class MultiChannelDTO {
  @IsString({ each: true })
  channelIds: string[];
}

class PartialChannelDTO implements PartialChannel {
  channelId: string;
  channelName: string;
  channelImageUrl?: string;
  verifiedMark: boolean;
  userAdultStatus?: string;
  personalData?: { privateUserBlock: boolean };
}

class LivePlaybackDTO implements LivePlayback {
  meta: {
    videoId: string;
    streamSeq: number;
    liveId: string;
    paidLive: boolean;
    cdnInfo: { cdnType: string; zeroRating: boolean };
    p2p: boolean;
  };
  serviceMeta: { contentType: string };
  live: { start: string; open: string; timeMachine: boolean; status: string };
  api: { name: string; path: string }[];
  media: Media[];
  thumbnail: { snapshotThumbnailTemplate: string; types: string[] };
  multiview;
}

class GetChannelDTO implements LiveDetail {
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
  livePlayback: LivePlaybackDTO;
  channel: PartialChannelDTO;
}

export class GetChannelsDTO {
  channels: GetChannelDTO[];
  count: number;
}
