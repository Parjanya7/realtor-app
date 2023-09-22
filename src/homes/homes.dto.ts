import { PropertyType } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";

export class HomeResponseDto {    
    id: number;
    adress: string;

    @Expose({ name: 'numberOfBeds' })
    numberOfBeds() {
        return this.number_of_beds;
    }

    @Exclude()
    number_of_beds: number;

    @Expose({ name: 'numberOfBathrooms' })
    numberOfBathrooms() {
        return this.number_of_bathrooms;
    }

    @Exclude()
    number_of_bathrooms: number;

    city: string;

    @Expose({ name: 'listedDate' })
    listedDate() {
        return this.listedDate;
    }

    @Exclude()
    listed_date: Date;

    price: number;

    @Expose({ name: 'landSize' })
    landSize() {
        return this.land_size;
    }

    @Exclude()
    land_size: number;

    @Expose({ name: 'propertyType' })
    propertyType() {
        return this.property_type;
    }

    @Exclude()
    property_type: PropertyType;

    @Exclude()
    realtor_id: number;

    @Exclude()
    created_at: Date;

    @Exclude()
    updated_at: Date;

    constructor(partial: Partial<HomeResponseDto>) {
        Object.assign(this, partial);
    }
}