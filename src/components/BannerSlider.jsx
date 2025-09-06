// "use client";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// import Image from "next/image";

// export default function BannerSlider() {
//   return (
//     <div className="banner-slider my-4">
//       <Swiper
//             modules={[Navigation]}
//         navigation
//         loop={true}
//         centeredSlides={true}
//         slidesPerView={"auto"}
//         spaceBetween={20}
//         className="custom-swiper"
//       >
//         {/* Slide 1 */}
//          <SwiperSlide className="custom-slide">
//           <div className="relative banner-height w-full h-[350px] bg-pink-100 flex items-center justify-center overflow-hidden rounded-lg">
//             <Image
//               src="/images/back-to-school.jpg"
//               alt="Back to School"
//               fill
//               className="object-cover rounded-[20px]"
//             />
//             {/* <div className="absolute inset-0 flex flex-col justify-center items-center text-black bg-black/20">
//               <h2 className="text-4xl font-bold">Back to School Offers</h2>
//               <p className="mt-2 text-lg">
//                 Shop smart with Samsung, JD-Williams, Clarks, M&S
//               </p>
//               <button className="mt-4 bg-black text-white px-6 py-2 rounded-lg">
//                 Save Today →
//               </button>
//             </div> */}
//           </div>
//         </SwiperSlide>

//         {/* Slide 2 */}
//           <SwiperSlide className="custom-slide">
//           <div className="relative w-full banner-height h-[350px] bg-gray-200 flex items-center justify-center overflow-hidden rounded-lg">
//             <Image
//               src="/images/sale-banner.jpg"
//               alt="Big Sale"
//               fill
//               className="object-cover  rounded-[20px]"
//             />
//             {/* <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/30">
//               <h2 className="text-4xl font-bold">Up to 80% Off</h2>
//               <p className="mt-2 text-lg">Exclusive VIP Retailer Deals</p>
//               <button className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-lg">
//                 Shop Now →
//               </button>
//             </div> */}
//           </div>
//         </SwiperSlide>

//           <SwiperSlide className="custom-slide">
//           <div className="relative banner-height w-full h-[350px] bg-pink-100 flex items-center justify-center overflow-hidden rounded-lg">
//             <Image
//               src="/images/back-to-school.jpg"
//               alt="Back to School"
//               fill
//               className="object-cover  rounded-[20px]"
//             />
//             {/* <div className="absolute inset-0 flex flex-col justify-center items-center text-black bg-black/20">
//               <h2 className="text-4xl font-bold">Back to School Offers</h2>
//               <p className="mt-2 text-lg">
//                 Shop smart with Samsung, JD-Williams, Clarks, M&S
//               </p>
//               <button className="mt-4 bg-black text-white px-6 py-2 rounded-lg">
//                 Save Today →
//               </button>
//             </div> */}
//           </div>
//         </SwiperSlide>
//       </Swiper>
//     </div>
//   );
// }

"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from "next/image";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
export default function BannerSlider({ heroImages, heroHeadline, heroSubheadline }) {
  if (!heroImages.length) {
    return null; // Don't render if no images
  }

  return (
   <div className="banner-slider my-4">
  <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y]}
    navigation
    loop={true}
    centeredSlides={true}
    slidesPerView={"auto"}
    spaceBetween={20}
    pagination={{ clickable: true }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log("slide change")}
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
