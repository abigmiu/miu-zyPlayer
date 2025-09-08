import { defineComponent, onBeforeUpdate, ref, nextTick } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { Mousewheel, Virtual } from 'swiper/modules';
import './style.scss';
import TemplateVerticalVideo from './template';


interface IVerticalVideoItem {
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

interface IDataItem extends IVerticalVideoItem {
    _rid: string;
}

export default defineComponent({
    name: 'VerticalVideoTemplate',
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        const props = defineProps<{
            id: string;
        }>();


        const templateIns: TemplateVerticalVideo = new ;


        const dataList = ref<IDataItem[]>([]);
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
                const rid = dataList.value[preIndex.value]._rid;
                if (videoRefs[rid]) {
                    videoRefs[rid].pause();
                }
            }

            if (currentIndex.value) {
                const currentRid = dataList.value[currentIndex.value]._rid;
                if (videoRefs[currentRid]) {
                    videoRefs[currentRid].play();
                }
            }
        };

        const togglePlay = (video: HTMLVideoElement) => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        };

        return () => (
            <div class="vertical-video-wrapper">
                <Swiper
                    direction={'vertical'}
                    slidesPerView={1}
                    spaceBetween={30}
                    mousewheel={true}
                    modules={[Mousewheel, Virtual]}
                    virtual
                    onSlideChange={onSlideChange}
                    style={{ width: '100%', height: '100vh' }}
                >
                    {
                        dataList.value.map((video, index) => (
                            <SwiperSlide key={video._rid} virtualIndex={index}>
                                <video
                                    ref={(el) => setVideoRef(el, video._rid)}
                                    src={video.videoUrl}
                                    class="w-full h-full object-cover"
                                    onClick={(e) => togglePlay(e.target as HTMLVideoElement)}
                                    loop
                                    autoplay
                                ></video>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>

        );
    },
});
