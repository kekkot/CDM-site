<?php namespace web51\ShopCatalog\Updates;

use Schema;
use Illuminate\Database\Schema\Blueprint;
use October\Rain\Database\Updates\Migration;

/**
 * Class UpdateTableProducts1
 * @package Lovata\BaseCode\Updates
 */
class UpdateTableOrders1 extends Migration
{
    const TABLE_NAME = 'lovata_shopaholic_products';

    public function up()
    {
        Schema::table(self::TABLE_NAME, function (Blueprint $obTable)
        {
            $obTable->text('preview_text')->change();
        });
    }

    public function down()
    {
    }
}
