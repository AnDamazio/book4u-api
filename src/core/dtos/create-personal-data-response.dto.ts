export class CreateLocationResponseDto {
  success: boolean;
  createdLocation: { address: string; complement: string };
}

export class CreateTelephoneResponseDto {
  success: boolean;
  createdTelephone: { telephone: string };
}
