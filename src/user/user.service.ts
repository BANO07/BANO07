import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from "argon2";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) 
    private readonly userRepository : Repository<User>,
    private readonly jwtService: JwtService,
  ){}

  async create(createUserDto: CreateUserDto) {
    const {id, name, username, email, password, roles} = createUserDto;
    const hashPassword = await argon2.hash(password);
    await this.userRepository.save({name, username, email, password : hashPassword, roles});
    const token = this.jwtService.sign({id, roles, name, email});
    return {access_token :token};
  }

  async logIn(payload:any){
    const user = await this.userRepository.findOne({where:{username:payload.username}})
    if(!user) return "Username is incorrect Please Enter the correct username";
    const match = await argon2.verify(user.password, payload.password);
    if(match){
      const { password, ...rest} = user;
      return {access_token : this.jwtService.sign({...rest})};
    }
    return "Password is incorrect Please Enter the correct Password"
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({id})
  }

  findOneBy(username:string){
    return this.userRepository.findOne({where:{username}})
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto)
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}
