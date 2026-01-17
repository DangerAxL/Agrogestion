<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stages', function (Blueprint $table) {
            $table->id();
            $table->string('stage_name');
            $table->foreignId('animal_id')->constrained('animals')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('caravanas', function (Blueprint $table) {
            $table->id();
            $table->string('caravana_nro');
            $table->string('color');
            $table->foreignId('animal_id')->constrained('animals')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('caravanas');
        Schema::dropIfExists('stages');
    }
};
