<?php namespace Codecycler\CustomSortShopaholic\Classes\Event;

use Lovata\Shopaholic\Models\Product;
use October\Rain\Extension\ExtensionBase;
use October\Rain\Extension\ExtensionTrait; 

class SortableScope extends ExtensionBase
{
    use ExtensionTrait;

    public function subscribe()
    {
        Product::extend(function ($obModel) {
            // Use the Sortable trait in the Product class
            $obModel->implement[] = 'October.Rain.Database.Behaviors.Sortable';
        });
    }
} 