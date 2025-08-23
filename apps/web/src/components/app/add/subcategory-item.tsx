import { Link } from '@tanstack/react-router';

import type { TRPCOutput } from '@the-monthly-expense/trpc';
import { Card } from '~/components/ui/card';

import { subcategoryInfo } from '~/utils/categories';

export function SubCategoryItem({
  subcategory,
  category,
}: {
  subcategory: TRPCOutput['expense']['getCategories']['categories'][number]['subcategories'][number];
  category: TRPCOutput['expense']['getCategories']['categories'][number];
}) {
  const info = subcategoryInfo[subcategory.slug];

  return (
    <Link
      to="/{-$locale}/app/add/$category/$subcategory"
      params={{ category: category.slug, subcategory: subcategory.slug }}
    >
      <Card className="cursor-pointer border-2 p-4 transition-all duration-200 hover:border-primary/20 hover:shadow-md">
        <div className="flex items-center space-x-4">
          <div>
            <h3 className="font-medium">{info.label}</h3>
          </div>
        </div>
      </Card>
    </Link>
  );
}
