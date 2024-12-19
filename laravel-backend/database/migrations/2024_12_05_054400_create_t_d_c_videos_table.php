<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('t_d_c_videos', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('session');
            $table->string('description')->nullable();
            $table->string('duration')->default(0);
            $table->string('filename');
            $table->string('filepath');
            $table->string('video_url');
            $table->string('instructor')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_d_c_videos');
    }
};
