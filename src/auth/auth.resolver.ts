import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
// import { CreateAuthInput } from './dto/signup-input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { SignUpInput } from './dto/signup-input';
import { SignResponse } from './dto/sign-response';
import { SignInInput } from './dto/signin-input';
import { LogOutResponse } from './dto/logout-response';
import { Public } from './decorators/public.decorator';
import { NewTokensResponse } from './dto/newTokensResponse';
import { CurrentUserId } from './decorators/currentUserId.decorator';
import { CurrentUser } from './decorators/currentUser.decorator';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuards } from './guards/accessToken.guard';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => SignResponse)
  @Public()
  signup(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signup(signUpInput);
  }

  @Mutation(() => SignResponse)
  @Public()
  async signin(@Args('signInInput') signInInput: SignInInput) {
    return await this.authService.signin(signInInput);
    // return this.authService.signin(signInInput);
    // return res;
  }

  @Query(() => [Auth], { name: 'auth' })
  findAll() {
    return this.authService.findAll();
  }

  @Query(() => Auth, { name: 'auth' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authService.findOne(id);
  }

  @Mutation(() => Auth)
  updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
    return this.authService.update(updateAuthInput.id, updateAuthInput);
  }

  @Mutation(() => Auth)
  removeAuth(@Args('id', { type: () => Int }) id: number) {
    return this.authService.remove(id);
  }

  @Mutation(() => LogOutResponse)
  logOut(@Args('id', { type: () => Int }) id: number) {
    return this.authService.logout(id);
  }

  @Public()
  @Query(() => String)
  hello() {
    return 'hello';
  }

  @Query(() => String)
  // @UseGuards(AccessTokenGuards)
  hello1() {
    return 'hello1';
  }

  // @UseGuards(RefreshTokenGuard)
  @Query(() => String)
  // @UseGuards(AccessTokenGuards)
  hello2() {
    return 'hello2';
  }

  // @UseGuards(RefreshTokenGuard)
  @Mutation(() => NewTokensResponse)
  getNewTokens(@CurrentUserId() userId: number) {
    // console.log(refreshToken)
    return this.authService.getNewTokens(userId);
  }
}
