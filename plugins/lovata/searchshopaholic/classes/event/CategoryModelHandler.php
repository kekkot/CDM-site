<?php namespace Lovata\SearchShopaholic\Classes\Event;

use App;
use Lovata\Shopaholic\Models\Category;
use Lovata\Shopaholic\Models\Product;
use Lovata\Shopaholic\Models\Settings;
use Lovata\Shopaholic\Classes\Collection\CategoryCollection;
use Lovata\SearchShopaholic\Classes\Helper\SearchHelper;

/**
 * Class CategoryModelHandler
 * @package Lovata\SearchShopaholic\Classes\Event
 * @author  Andrey Kharanenka, a.khoronenko@lovata.com, LOVATA Group
 */
class CategoryModelHandler
{
    /**
     * Add listeners
     */
    public function subscribe()
    {
        Category::extend(function ($obModel) {
            /** @var Category $obModel */
            $obModel->fillable[] = 'search_synonym';
            $obModel->fillable[] = 'search_content';
        });

        CategoryCollection::extend(function ($obCollection) {
            /** @var CategoryCollection $obCollection */
            $obCollection->addDynamicMethod('search', function ($sSearch) use ($obCollection) {

                /** @var array $arSettings */
                $arSettings = Settings::getValue('category_search_by');

                /** @var SearchHelper $obSearchHelper */
                $obSearchHelper = App::make(SearchHelper::class, [
                    'sModel' => Category::class,
                ]);
                $arElementIDList = $obSearchHelper->result($sSearch, $arSettings);

                return $obCollection->applySorting($arElementIDList);
            });
        });
    }
}
