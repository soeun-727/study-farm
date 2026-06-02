export default function MyCrops() {
  const totalCells = Array.from({ length: 14 });

  return (
    <div
      className="bg-(--primary-brown) rounded-[10px] w-115 h-40 
                 grid grid-cols-7 grid-rows-2 gap-2 p-3"
    >
      {totalCells.map((_, index) => (
        <div key={index} className="flex items-center justify-center"></div>
      ))}
    </div>
  );
}
