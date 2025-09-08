import TemplateVerticalVideo, { IVerticalVideoItem } from "./template";

class TestTemplate extends TemplateVerticalVideo {
    protected async fetchPageData(): Promise<IVerticalVideoItem[]> {
        return [];
    }
}
