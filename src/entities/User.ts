import { IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { Gender, Type } from '../types';
import { Address } from './Address';
import { BaseEntity } from './BaseEntity';


@Entity('users')
export class User extends BaseEntity {

    @Column({ type: 'simple-enum', enum: Type })
    type: Type;

    @Column({ type: 'varchar', nullable: false })
    name: string

    @Column({ type: 'varchar', nullable: true })
    @ValidateIf(entity => entity.type === Type.LEGAL_ENTITY)
    @IsNotEmpty()
    companyName: string

    @Column({ type: 'varchar', nullable: false })
    document: string

    @Column({ type: 'simple-enum', enum: Gender })
    gender: Gender

    @Column({ type: 'date', nullable: false })
    dateOfBirth: Date

    @Column({ type: 'varchar', nullable: true })
    @ValidateIf(entity => !!entity.email)
    @IsEmail()
    email: string

    @Column({ type: 'varchar', nullable: true })
    phoneNumber: string

    @Column({ type: 'varchar', nullable: true })
    cellphoneNumber: string

    @Column({ type: 'varchar', nullable: true })
    photo: string

    @OneToMany(() => Address, address => address.user)
    addresses: Array<Address>
}