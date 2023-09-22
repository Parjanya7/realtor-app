import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { HomesService } from './homes.service';

@Controller('homes')
export class HomesController {
    constructor(private readonly homeService:HomesService) {}

    @Get()
    async getHomes(): Promise<Record<string, any>> {
        const response = await this.homeService.getHomes();
        return { message: 'All Homes', data: response };
    }

    @Get(':id')
    async getHome(@Param('id') id: number): Promise<Record<string, any>> {
        const response = await this.homeService.getHome(id);
        return { message: `Home with id ${id}`, data: response };
    }

    @Post()
    async createHome(): Promise<Record<string, any>> {
        return {};
    }

    @Put(':id')
    async updateHome(): Promise<Record<string, any>> {
        return {};
    }

    @Delete(':id')
    async deleteHome(): Promise<void> {

    }
}
