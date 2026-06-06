interface MyCropsProps {
  collectedCrops?: string[];
}

export default function MyCrops({ collectedCrops }: MyCropsProps) {
  const topRowCells = Array.from({ length: 7 });
  const bottomRowCells = Array.from({ length: 6 });
  const crops = collectedCrops || [];
  return (
    <div
      className="bg-(--primary-brown) rounded-[10px] w-115 h-40 
                 flex flex-col justify-between p-3 gap-2"
    >
      {/* 1. 첫 번째 행: 7열 */}
      <div className="grid grid-cols-7 flex-1">
        {topRowCells.map((_, index) => {
          const imgSrc = crops[index];
          return (
            <div
              key={`top-${index}`}
              className="flex items-center justify-center aspect-square overflow-hidden p-1"
            >
              {imgSrc && (
                <img
                  src={imgSrc}
                  className="h-full object-contain"
                  alt="수확된 작물"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* 2. 두 번째 행: 6열 */}
      <div className="flex justify-center gap-2 flex-1">
        {bottomRowCells.map((_, index) => {
          const actualIndex = index + 7;
          const imgSrc = crops[actualIndex];

          return (
            <div
              key={`bottom-${index}`}
              className="flex items-center justify-center flex-1 w-15 aspect-square overflow-hidden p-1"
            >
              {imgSrc && (
                <img
                  src={imgSrc}
                  className="h-full object-contain"
                  alt="수확된 작물"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
