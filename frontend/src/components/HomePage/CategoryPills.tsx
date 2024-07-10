import Button from "../Button";
type CategoryPillsProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};
const CategoryPills = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillsProps) => {
  return (
    <div className="overflow-x-hidden relative">
      <div className="flex gap-3 whitespace-nowrap transition-transform w-[max-content]">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category  ? "dark" : "default"}
            onClick={() => onSelect(category)}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryPills;
