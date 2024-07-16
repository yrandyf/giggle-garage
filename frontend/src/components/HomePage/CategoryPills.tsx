import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../Button";
import { useEffect, useRef, useState } from "react";
type CategoryPillsProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TRANSLATE_AMOUNT = 200;

const CategoryPills = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillsProps) => {
  const [translate, setTranslate] = useState<number>(0);
  const [isLeftVisible, setIsLeftVisible] = useState<boolean>(false);
  const [isRightVisible, setIsRightVisible] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current == null) return
    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container== null) return
      setIsLeftVisible(translate > 0);
      setIsRightVisible(translate + container.clientWidth < container.scrollWidth); //show only if we have space to move to the right.
    })
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    }
  }, [categories, translate])
  

  return (
    <div className="overflow-x-hidden relative" ref={containerRef}>
      <div className="flex gap-3 whitespace-nowrap transition-transform w-[max-content]" style={{ transform : `translateX(-${translate}px)` }}>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "dark" : "default"}
            onClick={() => onSelect(category)}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>
      {isLeftVisible && <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
        <Button
          variant="ghost"
          size={"icon"}
          className="h-full aspect-square w-auto p-1.5"
          onClick={() => setTranslate(translate => {
            const newTranslate = translate - TRANSLATE_AMOUNT;
            if (newTranslate < 0) return 0;
            return newTranslate;
          })}
        >
          <ChevronLeft />
        </Button>
      </div>}
      {isRightVisible && <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
        <Button
          variant="ghost"
          size={"icon"}
          className="h-full aspect-square w-auto p-1.5"
          onClick={() => {
            setTranslate(translate => {
              if(containerRef.current == null) {
                return translate;
              }

              const newTranslate = translate + TRANSLATE_AMOUNT;
              const edge = containerRef.current.scrollWidth;
              const width = containerRef.current.clientWidth;

              if (newTranslate + width >= edge) {
                return edge - width;
              }
              return newTranslate;
            })
          }}
        >
          <ChevronRight />
        </Button>
      </div>}
    </div>
  );
};

export default CategoryPills;
