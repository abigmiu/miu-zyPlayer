import { nanoid } from 'nanoid'

export interface IPageVideoItem {
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

export interface IRenderPageVideoItem extends IPageVideoItem {
    _id: string
}


export abstract class PageVideoTemplate {
    page!: number
    searchKey?: string;
    categories!: ICategoryItem[];

    /** 加载下一页数据 */
    abstract fetchPageData(page: number): Promise<IPageVideoItem[]>
}

/** 分页视频模板 */
export class PageVideoRuntime extends PageVideoTemplate {
    /** 输入框 */
    searchKey: string
    /** 数据列表 */
    dataList: IRenderPageVideoItem[]
    /** 分类选择项 */
    categories: ICategoryItem[]

    page = 0;

    constructor() {
        super();
        this.dataList = []
        this.searchKey = ''
        this.categories = []
    }

    protected async loadNextPage(): Promise<IRenderPageVideoItem[]> {
        const res = await this.fetchPageData(this.page + 1);
        this.page += 1;
        res.forEach((item) => {
            this.dataList.push({
                ...item,
                _id: nanoid()
            })
        })
        return this.dataList
    }

    /** 加载下一页数据 */
    async fetchPageData(page: number): Promise<IPageVideoItem[]> {
        return [];
    }
}
