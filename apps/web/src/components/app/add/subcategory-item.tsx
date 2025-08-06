import { Link } from '@tanstack/react-router';

import { Card } from '~/components/ui/card';

import type { Subcategory } from '~/utils/categories';

export function SubCategoryItem({
  subcategory,
  categoryId,
}: {
  subcategory: Subcategory;
  categoryId: string;
}) {
  return (
    <Link
      to="/{-$locale}/app/add/$category/$subcategory"
      params={{ category: categoryId, subcategory: subcategory.id }}
    >
      <Card className="cursor-pointer border-2 p-4 transition-all duration-200 hover:border-primary/20 hover:shadow-md">
        <div className="flex items-center space-x-4">
          <div>
            <h3 className="font-medium">{subcategory.name}</h3>
          </div>
        </div>
      </Card>
    </Link>
  );
}
