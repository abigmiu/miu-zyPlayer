import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap(port: number) {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    app.listen(port, () => {
        console.log('nest start on ', port)
    })
}

export default bootstrap;
