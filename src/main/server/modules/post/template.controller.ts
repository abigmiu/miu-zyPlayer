import { Controller, Get, Param } from '@nestjs/common'

@Controller()
export class TemplateController {
    @Get('template/:id')
    async getTemplateSource(@Param('id') id: string): void {
        console.log('id', id)
    }
}
