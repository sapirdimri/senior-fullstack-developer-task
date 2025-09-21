import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserStatus {
  Enabled = 'Enabled',
  Disabled = 'Disabled',
  Deleted = 'Deleted',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'text', default: ['User'] }) // ❌ Single role only
  roles: String[];

  @Column({
    type: 'text',
    default: UserStatus.Enabled,
  })
  status: UserStatus;
}
