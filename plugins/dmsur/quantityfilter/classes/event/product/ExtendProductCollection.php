<?php namespace Dmsur\QuantityFilter\Classes\Event\Product;

use Lovata\Shopaholic\Models\Offer;
use Lovata\Shopaholic\Classes\Collection\ProductCollection;
use Dmsur\QuantityFilter\Classes\Store\ProductListStore;

/**
 * Class ExtendProductCollection
 * @package Dmsur\QuantityFilter\Classes\Event\Product
 */
class ExtendProductCollection
{
    public function subscribe()
    {
        ProductCollection::extend(function ($obList) {
            $this->addGetByQuantity($obList);
        });
    }

    /**
     * Add flterByWeight method
     * @param ProductCollection $obProductList
     */

    protected function addGetByQuantity($obList)
    {

        $obList->addDynamicMethod('getByQuantity', function () use ($obList) {

            $arProductInStockIDList = ProductListStore::instance()->quantity_sort->get();

            $obList = $obList->intersect($arProductInStockIDList);

            $arProductOutOfStockIDList = (array) Offer::active()->where('quantity', '=', 0)->lists('product_id');
            
            return $obList->merge($arProductOutOfStockIDList);
        });
    }
}



