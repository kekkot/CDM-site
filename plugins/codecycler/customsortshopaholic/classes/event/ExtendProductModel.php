<?php

namespace Codecycler\CustomSortShopaholic\Classes\Event;

use Lovata\Shopaholic\Models\Product;
use October\Rain\Extension\ExtensionBase;
use October\Rain\Extension\ExtensionTrait; 

class ExtendProductModel
{
    public function subscribe()
    {
        Product::extend(function ($obModel) { 
            $obModel->extendClassWith(SortableScope::class);
        });
    }
}