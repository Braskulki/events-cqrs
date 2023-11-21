
import { CreateUserModel, ListUsersParams, UpdateUserModel, UserModel } from '@src/domain/models/user.model';
import { Body, Delete, Get, JsonController, Post, Put, QueryParams, Req, Res, UseBefore } from 'routing-controllers';
import { container, inject, singleton } from 'tsyringe';
import authenticate from '../middlewares/authenticate';
import { Request, Response } from 'express';
import { ICreateUserUseCase, IUpdateUserUseCase, ISelfDeleteUserUseCase, CreateUserUseCase, UpdateUserUseCase, SelfDeleteUserUseCase } from '@src/domain/handlers/command/user';
import { createUserValidation, updateUserValidation } from '@src/domain/validators/user.validators';
import { IListUserUseCase } from '@src/domain/handlers/query/user/list/list-user.interface';
import { ListUserUseCase } from '@src/domain/handlers/query/user/list/list-user.use-case';


@singleton()
@JsonController('/user')
export class UserController {
  constructor(
    @inject('CreateUserUseCase') private readonly createUserUseCase: ICreateUserUseCase,
    @inject('UpdateUserUseCase') private readonly updateUserUseCase: IUpdateUserUseCase,
    @inject('SelfDeleteUserUseCase') private readonly selfDeleteUserUseCase: ISelfDeleteUserUseCase,
    @inject('ListUserUseCase') private readonly listUserUseCase: IListUserUseCase
  ) {
    this.createUserUseCase = container.resolve<CreateUserUseCase>('CreateUserUseCase');
    this.updateUserUseCase = container.resolve<UpdateUserUseCase>('UpdateUserUseCase');
    this.selfDeleteUserUseCase = container.resolve<SelfDeleteUserUseCase>('SelfDeleteUserUseCase');
    this.listUserUseCase = container.resolve<ListUserUseCase>('ListUserUseCase');
  }

  @Post('')
  async create(@Body() body: CreateUserModel): Promise<UserModel> {
    createUserValidation(body);

    const user = await this.createUserUseCase.execute(body);

    return user;
  }

  @Put('')
  @UseBefore(authenticate)
  async update(@Body() body: UpdateUserModel, @Req() req: Request): Promise<UserModel> {
    updateUserValidation(body);
    const user = await this.updateUserUseCase.execute(body, req.session);

    return user;
  }

  @Delete('')
  @UseBefore(authenticate)
  async delete(@Req() req: Request, @Res() res: Response): Promise<Response> {
    await this.selfDeleteUserUseCase.execute(req.session);
    return res.sendStatus(204);
  }

  @Get('')
  @UseBefore(authenticate)
  async list(@QueryParams() params: ListUsersParams): Promise<UserModel[]> {
    return this.listUserUseCase.execute(params);
  }
}
