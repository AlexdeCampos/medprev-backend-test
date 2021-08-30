import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User';

@Entity('addresses')
export class Address extends BaseEntity {

    @Column({ type: 'varchar', nullable: false })
    streetName: string;

    @Column({ type: 'varchar', nullable: true, default: 's/n' })
    number: string

    @Column({ type: 'varchar', nullable: true })
    complement: string

    @Column({ type: 'varchar', nullable: true })
    neighborhood: string

    @Column({ type: 'varchar', nullable: false })
    city: string

    @Column({ type: 'varchar', nullable: false })
    state: string

    @Column({ type: 'varchar', nullable: false })
    zipCode: string

    @ManyToOne(() => User, user => user.addresses)
    user: User
}