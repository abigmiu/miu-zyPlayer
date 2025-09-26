import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('file')
export class FileEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number

    @Column({ type: 'varchar', length: 50, name: 'template_id', comment: '模板ID' })
    templateId: string

    @Column({ type: 'varchar', length: 1000, name: 'url_path', comment: '文件网络url' })
    urlPath: string

    @Column({ type: 'varchar', length: 50, name: 'file_path', comment: '文件路径' })
    filePath: string
}
