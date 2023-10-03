<?php namespace Web51\ShopCatalog;

use Backend;
use System\Classes\PluginBase;

/**
 * Plugin Information File
 *
 * @link https://docs.octobercms.com/3.x/extend/system/plugins.html
 */
class Plugin extends PluginBase
{
    /**
     * pluginDetails about this plugin.
     */
    public function pluginDetails()
    {
        return [
            'name' => 'shopCatalog',
            'description' => 'No description provided yet...',
            'author' => 'web51',
            'icon' => 'icon-leaf'
        ];
    }

    /**
     * boot method, called right before the request route.
     */
    public function boot()
    {
        //
    }

    /**
     * registerComponents used by the frontend.
     */
    public function registerComponents()
    {
        return [
            'Web51\ShopCatalog\Components\Catalog' => 'Catalog',
        ];
    }

    /**
     * registerPermissions used by the backend.
     */
    public function registerPermissions()
    {
        return [
            'web51.shopcatalog.some_permission' => [
                'tab' => 'shopCatalog',
                'label' => 'Some permission'
            ],
        ];
    }

    /**
     * registerNavigation used by the backend.
     */
    public function registerNavigation()
    {
        return []; // Remove this line to activate

        return [
            'shopcatalog' => [
                'label' => 'shopCatalog',
                'url' => Backend::url('web51/shopcatalog/mycontroller'),
                'icon' => 'icon-leaf',
                'permissions' => ['web51.shopcatalog.*'],
                'order' => 500,
            ],
        ];
    }
}
