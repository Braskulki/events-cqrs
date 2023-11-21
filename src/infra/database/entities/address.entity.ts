import { Column, Entity } from 'typeorm';
import Base from './base.entity';

@Entity({ name: 'address' })
export default class AddressEntity extends Base {
  @Column()
  public street?: string;

  @Column()
  public number?: string;

  @Column()
  public complement?: string;

  @Column()
  public neighborhood?: string;

  @Column()
  public city?: string;

  @Column()
  public state?: string;

  @Column()
  public country?: string;
}
