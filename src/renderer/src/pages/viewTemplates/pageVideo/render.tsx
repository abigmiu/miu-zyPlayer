import { defineComponent, onBeforeUpdate, ref, nextTick, Ref, useTemplateRef } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useIntersectionObserver } from '@vueuse/core'
import './style.scss'
import { NEmpty, NGradientText, NSpin } from 'naive-ui'
import { usePageVideoRuntime } from './hooks'

export default defineComponent({
    name: 'PageVideoTemplate',
    components: {
        Swiper,
        SwiperSlide
    },
    setup() {
        const props = defineProps<{
            id: string
        }>()

        const {
            dataList,
            loading,
            loadingText,
            fetchIsError,
            initIsError,
            loadNextPage,
            setTemplate
        } = usePageVideoRuntime()

        const dataListEl = useTemplateRef<HTMLDivElement>('dataListElRef')
        const dataListFooter = useTemplateRef<HTMLDivElement>('dataListFooterRef')
        useIntersectionObserver(
            dataListFooter,
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadNextPage()
                }
            },
            {
                root: dataListEl.value
            }
        )

        return () => (
            <div class="page-video-wrapper">
                {initIsError ? <NEmpty description="❌加载数据源失败"></NEmpty> : <></>}

                <div class="data-list" ref="dataListElRef">
                    {dataList.value.map((item) => {
                        return <div class="data-item" key={item._id}></div>
                    })}
                </div>
                <div
                    ref="dataListFooterRef"
                    style="flex justify-center items-center"
                    v-show={!loading.value}
                >
                    <NGradientText type="warning">已经没有更多了</NGradientText>
                </div>

                {loading ? (
                    <div class="loading flex justify-center items-center">
                        <NSpin size="small"></NSpin>
                        <text>{{ loadingText }}</text>
                    </div>
                ) : (
                    <></>
                )}
                {fetchIsError ? <NEmpty description="❌数据加载失败"></NEmpty> : <></>}
            </div>
        )
    }
})
