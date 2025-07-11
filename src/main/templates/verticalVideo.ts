import { nanoid } from 'nanoid'

export interface IVerticalVideoItem {
    /** 标题 */
    title?: string
    /** 封面图 */
    cover?: string
    /** 视频地址 */
    videoUrl: string
    /** 作者 */
    author?: string
    /** 时间 */
    date?: string
}

export interface IKeyValue {
    label: string
    value: string
}

export interface ICategoryItem extends IKeyValue {
    children: IKeyValue[]
}

interface IVideoItem extends IVerticalVideoItem {
    _id: string
}

/** 竖屏视频 */
abstract class TemplateVerticalVideo {
    /** 输入框 */
    searchKey: string
    /** 数据列表 */
    dataList: IVideoItem[]
    /** 分类选择项 */
    categories: ICategoryItem[]

    constructor() {
        this.dataList = []
        this.searchKey = ''
        this.categories = []
    }

    protected async loadNextPage(): Promise<IVideoItem[]> {
        const res = await this.fetchPageData()
        res.forEach((item) => {
            this.dataList.push({
                ...item,
                _id: nanoid()
            })
        })
        return this.dataList
    }

    /** 加载下一页数据 */
    protected abstract fetchPageData(): Promise<IVerticalVideoItem[]>
}

export default TemplateVerticalVideo
