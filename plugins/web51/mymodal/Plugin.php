<?php namespace Web51\MyModal;

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
            'name' => 'MyModal',
            'description' => 'No description provided yet...',
            'author' => 'Web51',
            'icon' => 'icon-leaf'
        ];
    }

    /**
     * register method, called when the plugin is first registered.
     */
    public function register()
    {
        //
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
            'web51\mymodal\components\Modal' => 'MyModal',
        ];
    }

    /**
     * registerPermissions used by the backend.
     */
    public function registerPermissions()
    {
        return []; // Remove this line to activate

        return [
            'web51.mymodal.some_permission' => [
                'tab' => 'MyModal',
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
            'mymodal' => [
                'label' => 'MyModal',
                'url' => Backend::url('web51/mymodal/mycontroller'),
                'icon' => 'icon-leaf',
                'permissions' => ['web51.mymodal.*'],
                'order' => 500,
            ],
        ];
    }
}
