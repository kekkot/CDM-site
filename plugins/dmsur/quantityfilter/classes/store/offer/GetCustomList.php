<?php namespace Dmsur\QuantityFilter\Classes\Store\Offer;

use Lovata\Shopaholic\Models\Offer;
use Lovata\Toolbox\Classes\Store\AbstractStoreWithoutParam;

/**
 * Class GetCustomList
 * @package Dmsur\QuantityFilter\Classes\Store\Offer
 */
class GetCustomList extends AbstractStoreWithoutParam
{
    protected static $instance;

    /**
     * Get ID list from database
     * @return array
     */
    protected function getIDListFromDB() : array
    {
        $arElementIDList = (array) Offer::where('quantity', '>', 0)->lists('product_id');

        return $arElementIDList;
    }
}