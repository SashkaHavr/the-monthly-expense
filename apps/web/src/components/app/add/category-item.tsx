import { Card } from '~/components/ui/card';

import type { Category, Subcategory } from '~/utils/categories';
import { cn } from '~/lib/utils';

export function CategoryItem<T extends Category | Subcategory>({
  category,
  onSelect,
}: {
  category: T;
  onSelect: (category: T) => void;
}) {
  return (
    <Card
      className="cursor-pointer border-2 p-4 transition-all duration-200 hover:border-primary/20 hover:shadow-md"
      onClick={() => onSelect(category)}
    >
      <div className="flex items-center space-x-4">
        {'icon' in category && (
          <div className={cn('rounded-lg p-3', category.color)}>
            <category.icon size={24} className="text-white" />
          </div>
        )}
        <div>
          <h3
            className={cn('font-medium', 'icon' in category && 'text-center')}
          >
            {category.name}
          </h3>
        </div>
      </div>
    </Card>
  );
}
