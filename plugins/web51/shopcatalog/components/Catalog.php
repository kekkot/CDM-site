<?php namespace Web51\ShopCatalog\Components;

use Cms\Classes\ComponentBase;


/**
 * Catalog Component
 *
 * @link https://docs.octobercms.com/3.x/extend/cms-components.html
 */
class Catalog extends ComponentBase
{
    public function componentDetails()
    {
        return [
            'name' => 'Каталог сайта',
            'description' => 'Каталог сайта базовый компонент ЙОУ!'
        ];
    }

    public $obProductItem;
    public $obCategoryItem;
    public $obBrandItem;
    public $obActiveCategoryItem;

    public function onRun()
    {

        $this->obProductItem = $this->page->ProductPage->get();
        $this->obCategoryItem = $this->page->CategoryPage->get();
          if(!empty($this->page->BrandPage)) {
            $this->obBrandItem = $this->page->BrandPage->get();
        }


        if (!empty($this->obProductItem)) {
            $this->productPage();
        } elseif (!empty($this->obBrandItem)) {

            $this->brandPage();
        } else {
            $this->categoryPage();
        }
        $this->breadCrumbsGenerate();
    }

    public function setActiveCategory()
    {
        $obCategoryItem = $this->page->CategoryPage->get();
        $obMainCategoryItem = $this->page->MainCategoryPage->get();

        $this->obActiveCategoryItem = !empty($obActiveCategoryItem) ? $obCategoryItem : $obMainCategoryItem;
    }


    public function categoryPage()
    {
        $this->setActiveCategory();
        $this->page['obActiveCategoryItem'] = $this->obActiveCategoryItem;
        if(!empty($this->page->obActiveCategoryItem)){
            $this->page->title = $this->page->obActiveCategoryItem->name;

        }
        $thisActiveSorting = $this->page->ProductList->getSorting();
        $obProductList = $this->page->ProductList->make()->sort('custom')->active()->category($this->obActiveCategoryItem->id, true);
        $obBrands = $this->page->BrandList->make()->sort()->active()->category($this->obActiveCategoryItem->id);
  
        $this->page['obActiveCategoryItem'] = $this->obActiveCategoryItem;
        $this->page['obProductList'] = $obProductList;
        $this->page['obBrands'] = $obBrands;
    }

    public function brandPage()
    {
        $this->page->title = $this->obBrandItem->name;
        $this->page['obBrand'] = $this->obBrandItem;
    }

    public function productPage()
    {
        $this->page->title = $this->obProductItem->name;
        $this->page['obProduct'] = $this->obProductItem;
    }

    /**
     * @link https://docs.octobercms.com/3.x/element/inspector-types.html
     */
    public function defineProperties()
    {
        return [];
    }

    public function breadCrumbsGenerate()
    {
        $arBreadcrumbs = [];
        if (!empty($this->obProductItem)) {
            $obCategory = $this->obProductItem->category;
            if ($this->obProductItem->category->parent->name != 'Спецтехника' && $this->obProductItem->category->parent->name != 'Навесное оборудование') {
                $obMainCategory = $this->obProductItem->category->parent;
            }
            $arBreadcrumbs[] = [
                'name' => $this->obProductItem->name,
                'url' => $this->obProductItem->getPageUrl('catalog/categoryPage'),
            ];
            $arBreadcrumbs[] = [
                'name' => $obCategory->name,
                'url' => $obCategory->getPageUrl('catalog/categoryPage'),
            ];
            if (!empty($obMainCategory)) {
                $arBreadcrumbs[] = [
                    'name' => $obMainCategory->name,
                    'url' => $obMainCategory->getPageUrl('catalog/category'),
                ];
            }
            $arBreadcrumbs[] = [
                'name' => 'Главная',
                'url' => '/',
            ];
        }
        if (!empty($this->obActiveCategoryItem)) {
            $obCategory = $this->obActiveCategoryItem;
            $obMainCategory = $this->obActiveCategoryItem->parent;
            $arBreadcrumbs[] = [
                'name' => $obCategory->name,
                'url' => $obCategory->getPageUrl('catalog/categoryPage'),
            ];

            if (!empty($obMainCategory)) {
                $arBreadcrumbs[] = [
                    'name' => $obMainCategory->name,
                    'url' => $obMainCategory->getPageUrl('catalog/category'),
                ];
            }
            $arBreadcrumbs[] = [
                'name' => 'Главная',
                'url' => '/',
            ];
        }

        $this->page['arBreadcrumbs'] = $arBreadcrumbs = array_reverse($arBreadcrumbs);
    }

}
