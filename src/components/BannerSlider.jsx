"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from "next/image";
import { Navigation, Pagination, Scrollbar, A11y,Autoplay  } from 'swiper/modules';
export default function BannerSlider({ heroImages, heroHeadline, heroSubheadline }) {
  if (!heroImages.length) {
    return null; // Don't render if no images
  }

  return (
   <div className="banner-slider my-4">
  <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay ]}
    navigation
    loop={true}
    centeredSlides={true}
    slidesPerView={"auto"}
    spaceBetween={20}
    dir="rtl"
    pagination={{ clickable: true }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log("slide change")}
     autoplay={{
    delay: 3000,       // time between slides (ms)
    disableOnInteraction: false, // keep autoplay even after user interaction
  }}
    className="custom-swiper"
  >
    {heroImages.map((hero, idx) => (
      <SwiperSlide key={idx} className="custom-slide">
        <div className="relative banner-height w-full h-[350px] flex items-center justify-center overflow-hidden rounded-lg">
          {/* Wrap in link if provided */}
          {hero.link ? (
            <a href={hero.link} target="_blank" rel="noopener noreferrer" className="w-full h-full block">
              <Image
                src={hero.image}
                alt={hero.alt || hero.name || `Hero Slide ${idx + 1}`}
                fill
                className="object-cover rounded-[20px]"
                priority={idx === 0} // preload first image
              />
            </a>
          ) : (
            <Image
              src={hero.image}
              alt={hero.alt || hero.name || `Hero Slide ${idx + 1}`}
              fill
              className="object-cover rounded-[20px]"
              priority={idx === 0}
            />
          )}

          {/* Headline / Subheadline Overlay */}
          {(heroHeadline || heroSubheadline) && (
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/30 px-4 text-center">
              {heroHeadline && (
                <h2 className="text-3xl md:text-4xl font-bold drop-shadow-md">
                  {heroHeadline}
                </h2>
              )}
              {heroSubheadline && (
                <p className="mt-2 text-lg drop-shadow-md">
                  {heroSubheadline}
                </p>
              )}
            </div>
          )}

          {/* Optional Hero Name below the slide */}
          {hero.name && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-md text-sm">
              {hero.name}
            </div>
          )}
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

  );
}
