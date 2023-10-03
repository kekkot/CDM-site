<?php namespace Dmsur\QuantityFilter;

use Event;

use System\Classes\PluginBase;
use Dmsur\QuantityFilter\Classes\Event\Product\ProductModelHandler;
use Dmsur\QuantityFilter\Classes\Event\Product\ExtendProductCollection;
/**
 * QuantityFilter Plugin Information File
 */
class Plugin extends PluginBase
{

    public function boot()
    {
       
        Event::subscribe(ProductModelHandler::class);
        Event::subscribe(ExtendProductCollection::class);
    }
    

}
