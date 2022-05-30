import { Body, Controller, Post } from '@nestjs/common';
import { PersonalDataServices } from 'src/service';
import { LocationDto, CreateLocationResponseDto } from 'src/core';
@Controller('api/personal-data')
export class PersonalDataController {
  constructor(private personalDataServices: PersonalDataServices) { }
  @Post()
  async createPersonalData(@Body() locationDto: LocationDto) {
    const locationResponse = new CreateLocationResponseDto();
    try {
      await this.personalDataServices.updateAddress(locationDto);
      locationResponse.success = true;
      locationResponse.createdLocation = {
        address: locationDto.address,
        complement: locationDto.complement,
      };
      return locationResponse;
    } catch (error) {
      locationResponse.success = false;
      return location;
    }
  }
}
