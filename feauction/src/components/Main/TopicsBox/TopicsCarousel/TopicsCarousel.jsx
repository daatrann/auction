import React from 'react';
import TopicCard from '../TopicCard/TopicCard';
import './TopicsCarousel.scss';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const TopicsCarousel = (props) => {
    const ImgUrl = 'https://jthemes.net/themes/wp/genz/wp-content/uploads/2023/02/design.png';
    const { tagData } = props;
    const [emblaRef] = useEmblaCarousel([
        {
            Autoplay: () => ({
                delay: '1000',
                pauseOnInteraction: 'true',
            }),
        },
    ]);

    return (
        <div className="swiper swiper-wrapper swiper-initialized swiper-horizontal swiper-pointer-events">
            <div className="embla">
                <div className="embla__container">
                    {tagData.slice(0, 4).map((tagData, index) => (
                        <TopicCard tagData={tagData} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopicsCarousel;
