import { onBeforeUpdate, ref, nextTick, Ref } from 'vue';

import { IRenderPageVideoItem, PageVideoTemplate } from './template';
import { nanoid } from 'nanoid';
import { cloneDeep } from 'es-toolkit';

export function usePageVideoRuntime() {
    const loading = ref(false);
    const loadingText = ref('');
    const initIsError = ref(false);
    const fetchIsError = ref(false);
    const dataList = ref<IRenderPageVideoItem[]>([]);

    let templateIns: PageVideoTemplate;
    const setTemplate = async (code: string) => {
        loading.value = true;
        loadingText.value = '🌌正在加载数据源🚀'
        const blob = new Blob([code], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);
        try {
            const { PageVideoRuntime } = await import(url);
            templateIns = PageVideoRuntime;
        } catch {
            initIsError.value = true;
        } finally {
            loading.value = false;
            URL.revokeObjectURL(url);
        }
    }

    // 数据获取
    const page = ref(0);
    const loadNextPage = async () => {
        if (loading.value) return;
        loading.value = true;
        loadingText.value = '⚡数据加载中'
        try {
            const res = await templateIns.fetchPageData(page.value + 1);
            page.value += 1;
            res.forEach((item) => {
                dataList.value.push({
                    ...cloneDeep(item),
                    _id: nanoid(),
                })
            })
        } catch {
            fetchIsError.value = true;
        } finally {
            loading.value = false;
        }

    }

    return {
        dataList,
        loading,
        fetchIsError,
        setTemplate,
        loadingText,
        initIsError,
        loadNextPage
    }
}

export function useSlide(params: {
    dataList: Ref<IRenderPageVideoItem[]>
}) {
    const currentIndex = ref<number>(); // 当前播放视频的index
    const preIndex = ref<number>(); // 上一个播放视频的index
    let videoRefs: Record<string, HTMLVideoElement> = {};
    const setVideoRef = (el, rid: string) => {
        if (el) {
            videoRefs[rid] = el as HTMLVideoElement;
        }
    }

    onBeforeUpdate(() => {
        videoRefs = {};
    })

    const onSlideChange = async () => {
        await nextTick();
        if (preIndex.value) {
            const rid = params.dataList.value[preIndex.value]._id;
            if (videoRefs[rid]) {
                videoRefs[rid].pause();
            }
        }

        if (currentIndex.value) {
            const currentRid = params.dataList.value[currentIndex.value]._id;
            if (videoRefs[currentRid]) {
                videoRefs[currentRid].play();
            }
        }
    };

    return {
        videoRefs,
        onSlideChange,
        setVideoRef,
        currentIndex,
        preIndex
    }
}


