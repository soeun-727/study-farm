// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { firstFarmer } from "../assets";
// import { leftArrow, rightArrow } from "../assets/home/homeIndex";

// export default function Home() {
//   const navigate = useNavigate();
//   const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);

//   return (
//     <div className="bg-[#DFCBAA] h-screen overflow-hidden relative">
//       {/* 왼쪽 감지 영역 */}
//       <div
//         className="fixed left-0 top-0 w-[25vw] h-full z-40"
//         onMouseEnter={() => setHoverSide("left")}
//         onMouseLeave={() => setHoverSide(null)}
//       >
//         <button className="absolute left-20 top-1/2 -translate-y-1/2 w-15 transition-transform active:scale-95">
//           <img
//             src={leftArrow}
//             className="w-full animate-bounce-left"
//             alt="이전"
//           />
//         </button>
//       </div>

//       {/* 오른쪽 감지 + 페이지 이동 */}
//       <div
//         className="fixed right-0 top-0 w-[25vw] h-full z-40"
//         onMouseEnter={() => setHoverSide("right")}
//         onMouseLeave={() => setHoverSide(null)}
//       >
//         <button
//           onClick={() => navigate("/mypage")}
//           className="absolute right-20 top-1/2 -translate-y-1/2 w-15 transition-transform active:scale-95"
//         >
//           <img
//             src={rightArrow}
//             className="w-full animate-bounce-right"
//             alt="다음"
//           />
//         </button>
//       </div>

//       <main className="absolute inset-0 flex justify-center items-center">
//         {/* 왼쪽 배경 */}
//         <div
//           className={`
//             w-75 h-full transition-colors duration-300
//             ${hoverSide === "left" ? "bg-[#FAFAFA]" : "bg-[#DFCBAA]"}
//           `}
//         />

//         {/* 중앙 */}
//         <div className="w-405 flex flex-col items-center gap-5 px-10 z-10">
//           <div className="flex items-center justify-center rounded-full w-60 h-60 bg-white overflow-hidden">
//             <img src={firstFarmer} className="h-full mt-4" />
//           </div>

//           <div className="typo-h2">공부 시작하기</div>
//         </div>

//         {/* 오른쪽 배경 */}
//         <div
//           className={`
//             w-75 h-full transition-colors duration-300
//             ${hoverSide === "right" ? "bg-[#FAFAFA]" : "bg-[#DFCBAA]"}
//           `}
//         />
//       </main>
//     </div>
//   );
// }
