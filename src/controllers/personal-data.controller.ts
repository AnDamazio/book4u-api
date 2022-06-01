import { Body, Controller, Param, Post } from "@nestjs/common";
import { PersonalDataServices, UserServices } from "src/service";
import { PartialPersonalDataDto, PartialResponse } from "src/core";
import * as jwt from "jsonwebtoken";
@Controller("api/personal-data/:token")
export class PersonalDataController {
  constructor(
    private personalDataServices: PersonalDataServices,
    private userServices: UserServices
  ) {}
  @Post()
  async createPersonalData(
    @Body() partialPersonalData: PartialPersonalDataDto,
    @Param("token") token: string
  ) {
    let partialResponse = new PartialResponse();
    const destructToken: any = jwt.decode(token);
    const user = await this.userServices.findByEmail(destructToken.email);
    const id = await this.userServices.getIdFromUser(user);
    partialPersonalData.id = id as unknown as string;

    const keyNames = Object.keys(partialPersonalData);

    keyNames.forEach((element) => {
      if (partialPersonalData[element] == null || partialPersonalData[element] == undefined || partialPersonalData[element] == "") {
        partialPersonalData[element] = user.personalData[element];
      }
    });
    try {
      await this.personalDataServices.updatePersonalData(partialPersonalData);
      return (partialResponse.success = true);
    } catch (error) {
      return (partialResponse.success = false);
    }
  }
}
