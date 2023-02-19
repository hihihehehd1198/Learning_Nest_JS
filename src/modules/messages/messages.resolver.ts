import { Mutation, ObjectType, Query, Resolver, Field } from '@nestjs/graphql';
import { MessageEntity } from './message.entity';
import { MessageService } from './messages.service';

@Resolver(() => MessageEntity)
export class MessageResolver {
  constructor(private messageService: MessageService) {}

  //   @Query(() => [Message])
  //   async getMessage(@Args('id', { nullable: true }) id: number) {
  //     return await this.MessageService.getMessage(id);
  //   }
  @Mutation(() => MessageEntity)
  async sendMessage() {
    return await this.messageService.sendMessage();
  }

  //   @Mutation(() => UserResponse)
  //   async deleteMessage(@Args('id', { type: () => [Int] }) id: number[]) {
  //     return await this.MessageService.deleteMessage(id);
  //   }
}
