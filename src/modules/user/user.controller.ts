import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { CreateUserDTO } from "./dto/create.user.dto";
import { UserService } from "./user.service";

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/new")
  async newUser(): Promise<CreateUserDTO> {
    return await this.userService.newUser();
  }
}
