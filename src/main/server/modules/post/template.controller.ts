import { Controller, Get, Param, Post } from "@nestjs/common";

@Controller()
export class TemplateController {
    constructor() {}

    @Get('template/:id')
    async getTemplateSource(@Param('id') id: string) {
        console.log('id', id);
    }
}
