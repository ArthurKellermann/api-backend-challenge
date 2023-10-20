export class UpdateUserBalanceDto {
  id: string;
  data: {
    revenue?: number;
    expense?: number;
  };
}
