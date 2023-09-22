import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { HomeResponseDto } from './homes.dto';

@Injectable()
export class HomesService {
    constructor(private readonly dbservice:DatabaseService) {}

    async getHomes(): Promise<HomeResponseDto[]> {
        const homes = await this.dbservice.homes.findMany();
        const homesList = homes.map(home => new HomeResponseDto(home));
        return homesList;
    }

    async getHome(id: number): Promise<Record<string, any>> {
        const home = await this.dbservice.homes.findUnique({
            where: {
                id
            }
        });

        if (!home) {
            throw new NotFoundException();
        }
        return home;
    }

    async createHome(): Promise<Record<string, any>> {
        return {};
    }

    async updateHome(): Promise<Record<string, any>> {
        return {};
    }

    async deleteHome(): Promise<string> {
        return;
    }
}
