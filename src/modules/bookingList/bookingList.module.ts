import { BookingListService } from './bookingList.service';
import { BookingListResolver } from './bookingList.resolver';

import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { PrismaService } from 'src/prisma/prisma.service';






@Module({
    providers: [
        PrismaService,
        BookingListResolver,
        BookingListService,
    ]
})
export class BookingListModule {

}