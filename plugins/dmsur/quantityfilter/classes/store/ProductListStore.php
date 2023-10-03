<?php namespace Dmsur\QuantityFilter\Classes\Store;

use Lovata\Toolbox\Classes\Store\AbstractListStore;

use Dmsur\QuantityFilter\Classes\Store\Offer\GetCustomList;

/**
 * Class OfferListStore
 * @package Lovata\BaseCode\Classes\Store
 * @property GetCustomList $my_custom
 */
class ProductListStore extends AbstractListStore
{
    protected static $instance;

    /**
     * Init store method
     */
    protected function init()
    {
        $this->addToStoreList('quantity_sort', GetCustomList::class);
    }
}