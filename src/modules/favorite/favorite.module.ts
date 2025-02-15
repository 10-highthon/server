import { Module } from "@nestjs/common";

import { ChzzkModule, PrismaModule } from "src/common";

import { FavoriteController } from "./favorite.controller";
import { FavoriteService } from "./favorite.service";

@Module({
  imports: [PrismaModule, ChzzkModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
