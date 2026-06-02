import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersDirectController } from './users/users.direct.controller';

@Module({
  imports: [UsersModule],
  controllers: [AppController, UsersDirectController],
  providers: [AppService],
})
export class AppModule {}
