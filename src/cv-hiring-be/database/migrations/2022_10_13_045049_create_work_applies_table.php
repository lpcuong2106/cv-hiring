<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWorkAppliesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('work_applies', function (Blueprint $table) {
            $table->id();
            $table->string('cv_url');
            $table->string('letter');
            $table->tinyInteger('status');

            $table->bigInteger('work_job_id')->unsigned();
            $table->foreign('work_job_id')->references('id')->on('work_jobs')->onDelete('cascade');

            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('work_applies');
    }
}
