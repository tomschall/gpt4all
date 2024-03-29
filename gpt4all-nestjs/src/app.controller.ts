import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createQuestion(@Req() req: Request): any {
    return this.appService.createQuestion(req.body.question);
  }
}
