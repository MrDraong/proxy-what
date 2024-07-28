import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Token extends Model {
  @Column
  tokenValue: string;
}
