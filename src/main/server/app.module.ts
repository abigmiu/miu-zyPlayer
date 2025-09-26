import { Module } from '@nestjs/common'
import { TemplateModule } from './modules/post/template.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import path from 'path'
import { app } from 'electron'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'better-sqlite3',
            database: path.join(app.getPath('userData'), 'database.db')
        }),
        TemplateModule
    ]
})
export class AppModule {}
