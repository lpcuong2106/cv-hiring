<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWorkJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('work_jobs', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('company_id')->unsigned();
            $table->string('slug')->unique();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            $table->string('name');
            $table->string('description');
            $table->string('benefit');
            $table->text('requirement');
            $table->string('requirement_exp');
            $table->string('requirement_gender');
            $table->unsignedInteger('amount_hiring');
            $table->unsignedInteger('amount_apply');
            $table->unsignedInteger('amount_accept');
            $table->string('address_work');
            $table->string('salary');
            $table->string('type');
            $table->boolean('is_open');
            $table->timestamp('expired_date');
            $table->bigInteger('province_id')->unsigned();
            $table->foreign('province_id')->references('id')->on('provinces')->onDelete('cascade');

            $table->bigInteger('work_category_id')->unsigned();
            $table->foreign('work_category_id')->references('id')->on('work_categories')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('work_jobs');
    }
}
