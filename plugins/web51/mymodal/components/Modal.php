<?php namespace Web51\MyModal\Components;

use Cms\Classes\ComponentBase;

/**
 * Modal Component
 *
 * @link https://docs.octobercms.com/3.x/extend/cms-components.html
 */
class Modal extends ComponentBase
{
    public function componentDetails()
    {
        return [
            'name' => 'Модалочка от шеф повара',
            'description' => 'Супер пупер модальное окно, АКВАДИСКОТЕКА!'
        ];
    }

    public function onRun()
    {
        $this->page['modalUnicName'] = $this->property('modalUnicName');
        $this->page['modalTitle'] = $this->property('modalTitle');
        $this->page['modalPartial'] = $this->property('modalPartial');
        $this->page['modalFooter'] = $this->property('modalFooter');;

        $this->addCss('assets/modal.css');
        $this->addJs('assets/modal.js');
    }
    /**
     * @link https://docs.octobercms.com/3.x/element/inspector-types.html
     */
    public function defineProperties()
    {
        return [
            'modalUnicName' => [
                'title'       => 'Уникальное имя',
                'description' => 'Придумайте уникальное имя на латинице',
                'default'     => 'modal-1',
            ],
            'modalPartial' => [
                'title'       => 'Имя partial',
                'description' => 'Укажите partial для контента',
                'default'     => 'callback',
            ],
            'modalTitle' => [
                'title'       => 'Заголовок модального окна',
                'description' => 'Укажите заголовок модального окна',
                'default'     => 'Обратный звонок',
            ],
            'modalFooter' => [
                'title'       => 'Ссылка на политику',
                'description' => 'Ссылка на политику конфиденциальности сайта',
                'default'     => '/policy',
            ],
        ];
    }
}
