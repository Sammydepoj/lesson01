import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'xnd dnd', email: 'dj1d@djd.djd', role: 'INTERN' },
    { id: 2, name: 'xnd dnd', email: 'dj2d@djd.djd', role: 'INTERN' },
    { id: 3, name: 'xnd dnd', email: 'dj3d@djd.djd', role: 'ADMIN' },
    { id: 4, name: 'xnd dnd', email: 'dj4d@djd.djd', role: 'ADMIN' },
    { id: 5, name: 'xnd dnd', email: 'dj5d@djd.djd', role: 'ENGINEER' },
    { id: 6, name: 'xnd dnd', email: 'dj6d@djd.djd', role: 'ENGINEER' },
  ];
  findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role);
      if (rolesArray.length === 0) {
        throw new NotFoundException('User role not found');
      }
      return rolesArray;
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found!');

    return user;
  }
  create(user: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = { id: usersByHighestId[0].id + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    return this.findOne(id);
  }
  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
