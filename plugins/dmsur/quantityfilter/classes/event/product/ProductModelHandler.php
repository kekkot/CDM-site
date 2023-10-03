<?php namespace Dmsur\QuantityFilter\Classes\Event\Product;

use Lovata\Toolbox\Classes\Event\ModelHandler;

use Lovata\Shopaholic\Models\Product;
use Lovata\Shopaholic\Classes\Item\ProductItem;
use Dmsur\QuantityFilter\Classes\Store\ProductListStore;

/**
 * Class ProductModelHandler
 * @package Lovata\Shopaholic\Classes\Event\Product
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
class ProductModelHandler extends ModelHandler
{
    /** @var  Product */
    protected $obElement;
    protected $bWithRestore = true;

    /**
     * Add listeners
     * @param \Illuminate\Events\Dispatcher $obEvent
     */
    public function subscribe($obEvent)
    {
        parent::subscribe($obEvent);

    }


    protected function afterSave()
    {
        parent::afterSave();

        ProductListStore::instance()->quantity_sort->clear($this->obElement->id);
    }

    protected function afterDelete()
    {
        parent::afterDelete();

        ProductListStore::instance()->quantity_sort->clear($this->obElement->id); 
    }



    /**
     * Get model class name
     * @return string
     */
    protected function getModelClass()
    {
        return Product::class;
    }

    /**
     * Get item class name
     * @return string
     */
    protected function getItemClass()
    {
        return ProductItem::class;
    }
}
