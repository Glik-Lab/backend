import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import USER_FIELDS from './fields/select-filds-user';

@Injectable()
export class UsersService {
  private readonly props: any = { select: [...USER_FIELDS] };

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    file: Express.Multer.File,
    createUserDto: CreateUserDto,
  ): Promise<any> {
    const fullUplaodPathURl =
      process.env.BACKEND_URL + '/' + process.env.UPLAOD_PATH;
    try {
      let imageUrl = null;
      if (file?.originalname) {
        imageUrl = `${fullUplaodPathURl}/${file.originalname}`;
      }
      const userData = {
        ...createUserDto,
        imageUrl: imageUrl,
      };
      const newUser = this.userRepository.create(userData);
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find(this.props);
  }

  async findOne(userUuid: string): Promise<any> {
    try {
      return this.userRepository.findOne({
        where: { uuid: userUuid },
        ...this.props,
      });
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async update(
    userUuid: string,
    file: Express.Multer.File,
    updateUser: UpdateUserDto,
  ): Promise<User> {
    const fullUplaodPathURl =
      process.env.BACKEND_URL + '/' + process.env.UPLAOD_PATH;

    try {
      const user = await this.findOne(userUuid);
      if (!user) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      let imageUrl = null;
      if (file?.originalname) {
        imageUrl = `${fullUplaodPathURl}/${file.originalname}`;
      }
      if (file?.originalname) {
        user.imageUrl = imageUrl;
      }

      if (updateUser?.fullName) {
        user.fullName = updateUser.fullName;
      }
      if (updateUser?.email) {
        user.email = updateUser.email;
      }

      user.updatedAt = new Date();
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.CONFLICT);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      await this.userRepository.softDelete({ id: +id });
      return await this.userRepository.findOne({
        where: {
          id: +id,
        },
        withDeleted: true,
      });
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
