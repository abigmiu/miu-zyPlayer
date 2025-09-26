import { Injectable } from '@nestjs/common'

@Injectable()
export class TemplateService {
    async loadPage(): Promise<void> {
        console.log('loadPage')
    }
}
