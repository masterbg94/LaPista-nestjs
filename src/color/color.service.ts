import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColorEntity } from './color.entity';
import { ColorDto } from './colorDto';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(ColorEntity)
    private colorRepository: Repository<ColorEntity>,
  ) {}

  async getAllColors() {
    return await this.colorRepository.find({
      relations: ['sizes', 'sizes.heel'],
    });
  }

  /* Fix za vracanje boje u single color by id { relations: ['sizes', 'sizes.heel'] } */
  async getColorForId(colorId) {
    return await this.colorRepository.findOne(colorId,{
      relations: ['sizes', 'sizes.heel']
    });
  }

  async create(data: ColorDto) {
    const color = this.colorRepository.create(data);
    await this.colorRepository.save(data);
    return color;
  }

  async delete(id: string) {
    return await this.colorRepository.delete(id);
  }

  async update(id: number, data: Partial<ColorDto>) {
    await this.colorRepository.update({ id }, data);
    return await this.colorRepository.findOne({ id });
  }
}
