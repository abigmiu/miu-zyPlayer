import { Controller, Post } from "@nestjs/common";

@Controller()
export class PostController {
    constructor() {}

    @Post('template/verticalVideo')
    async loadPage() {
        console.log('13123')
    }
}
