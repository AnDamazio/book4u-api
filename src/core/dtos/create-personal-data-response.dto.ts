export class CreateLocationResponseDto {
  success: boolean;
  createdLocation: { address: string, complement: string };
}
