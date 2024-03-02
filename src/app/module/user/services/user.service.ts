import { Inject, Injectable } from "@nestjs/common";
import { UserCrudService } from "../crud/user.crud.service";

@Injectable()
export class UserService {
  constructor(
    @Inject(UserCrudService) private userCrudService: UserCrudService,
  ) {}
}
