import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookingListDTO } from './bookingList.dto';
import { BookingList } from './bookingList.entity';
import { BookingListService } from './bookingList.service';

@Resolver(() => BookingList)
export class BookingListResolver {
  constructor(private bookingListService: BookingListService) {}

  @Query(() => [BookingList])
  async findBookingList(
    @Args('id', { type: () => Int, nullable: true })
    id?: number,
  ) {
    return await this.bookingListService.getAllBookingList(id);
  }

  @Mutation(() => BookingList)
  async createBooking(@Args('data') data: BookingListDTO) {
    return await this.bookingListService.createBooking(data);
  }

  @Mutation(() => BookingList)
  async updateBooking(@Args('data') data: BookingListDTO) {
    return await this.bookingListService.updateBookingList(data);
  }

  @Mutation(() => String)
  async deleteBooking(
    @Args('id', { type: () => [Number], nullable: true }) id?: number[],
  ) {
    return await this.bookingListService.deleteBookingList(id);
  }
}
